import { useState, useCallback } from 'react';

const useProductInteractions = () => {
    const [showCartAction, setShowCartAction] = useState(false);
    const [showCartActionButton, setShowCartActionButton] = useState(false);
    const [openMobileCartAction, setOpenMobileCartAction] = useState(false);

    const showCartButton = useCallback(() => {
        setShowCartActionButton(true);
    }, []);

    const hideCartButton = useCallback(() => {
        setShowCartActionButton(false);
    }, []);

    const displayCartAction = useCallback(() => {
        setShowCartAction(true);
    }, []);

    const hideCartAction = useCallback(() => {
        setShowCartAction(false);
    }, []);

    const displayMobileCartAction = useCallback(() => {
        setOpenMobileCartAction(true);
    }, []);

    const hideMobileCartAction = useCallback(() => {
        setOpenMobileCartAction(false);
    }, []);

    return {
        showCartAction,
        showCartActionButton,
        openMobileCartAction,
        showCartButton,
        hideCartButton,
        displayCartAction,
        displayMobileCartAction,
        hideCartAction,
        hideMobileCartAction,
    };
};

export default useProductInteractions;