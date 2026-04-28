import { useEffect, useRef } from 'react';

type ModalEntry = {
  id: string;
  onClose: () => void;
  pushedState: boolean;
};

type UseBackCloseModalOptions = {
  isOpen: boolean;
  onClose: () => void;
  enabled?: boolean;
  pushStateOnOpen?: boolean;
};

const MODAL_HISTORY_KEY = '__webmade_modal_id__';
const modalStack: ModalEntry[] = [];
let popstateBound = false;
const closingByPopstate = new Set<string>();

function getTopModal() {
  return modalStack[modalStack.length - 1] ?? null;
}

function bindPopstateOnce() {
  if (popstateBound || typeof window === 'undefined') return;

  window.addEventListener('popstate', () => {
    const top = getTopModal();
    if (!top) return;

    // 뒤로가기가 발생하면 마지막 모달 하나만 닫음
    closingByPopstate.add(top.id);
    modalStack.pop();
    top.onClose();
  });

  popstateBound = true;
}

export function useBackCloseModal({
  isOpen,
  onClose,
  enabled = true,
  pushStateOnOpen = true,
}: UseBackCloseModalOptions) {
  const modalIdRef = useRef(`modal-${Math.random().toString(36).slice(2)}-${Date.now()}`);
  const registeredRef = useRef(false);

  useEffect(() => {
    bindPopstateOnce();
  }, []);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const modalId = modalIdRef.current;

    if (isOpen && !registeredRef.current) {
      modalStack.push({
        id: modalId,
        onClose,
        pushedState: pushStateOnOpen,
      });
      registeredRef.current = true;

      if (pushStateOnOpen) {
        window.history.pushState(
          { [MODAL_HISTORY_KEY]: modalId },
          '',
          window.location.href
        );
      }
      return;
    }

    if (!isOpen && registeredRef.current) {
      const index = modalStack.findIndex((entry) => entry.id === modalId);
      const removed = index >= 0 ? modalStack.splice(index, 1)[0] : null;
      registeredRef.current = false;

      // 뒤로가기로 닫힌 케이스면 추가 처리 없음
      if (closingByPopstate.has(modalId)) {
        closingByPopstate.delete(modalId);
        return;
      }

      // X 버튼 등으로 닫힌 경우: 모달용 pushState를 history에서 정리
      if (removed?.pushedState) {
        const state = window.history.state as Record<string, unknown> | null;
        if (state && state[MODAL_HISTORY_KEY] === modalId) {
          window.history.back();
        }
      }
    }
  }, [enabled, isOpen, onClose, pushStateOnOpen]);

  useEffect(() => {
    return () => {
      if (!registeredRef.current) return;
      const modalId = modalIdRef.current;
      const index = modalStack.findIndex((entry) => entry.id === modalId);
      if (index >= 0) modalStack.splice(index, 1);
      registeredRef.current = false;
    };
  }, []);
}

