import { useEffect } from 'react';

type UseOutsideClickClose = {
	isMenuOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
	event?: 'click' | 'mousedown'
};

export const useOutsideClickClose = ({
	isMenuOpen,
	rootRef,
	onClose,
	onChange,
	event = 'click',
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isMenuOpen && onClose?.();
				onChange?.(false);
			}
		};

		window.addEventListener(event, handleClick);

		if (!isMenuOpen) return;

		window.addEventListener(event, handleClick);
	},
	 [onClose, onChange, isMenuOpen]);
};
