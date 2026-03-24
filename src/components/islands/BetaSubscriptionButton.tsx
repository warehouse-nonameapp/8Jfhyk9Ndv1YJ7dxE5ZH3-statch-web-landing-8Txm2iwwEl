import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Strings } from '../../consts/strings';
import { ApiService } from '../../services/api';
import { ValidationUtils } from '../../utils/validation';

interface Props {
    className?: string;
}

export const BetaSubscriptionButton = ({ className = "" }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [step, setStep] = useState<'input' | 'success'>('input');
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState(false);
    const [focused, setFocused] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSubmit = async () => {
        if (!email || !ValidationUtils.isValidEmail(email)) {
            return;
        }

        setLoading(true);
        setError(false);

        const success = await ApiService.signupToBeta(email);

        if (success) {
            setStep('success');
            const end = Date.now() + 1200;
            const colors = [
                '#26ccff',
                '#a259ff',
                '#ff5e7e',
                '#ffbe10',
                '#48ff6b',
                '#ffffff'
            ];

            const frame = () => {
                confetti({
                    particleCount: 3,
                    angle: 270,
                    spread: 120,
                    origin: { x: 0.5, y: -0.1 },
                    colors,
                    zIndex: 99999,
                    startVelocity: 50,
                    gravity: 1.1,
                    scalar: 0.9,
                    drift: 0,
                    ticks: 250
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };
            frame();
        } else {
            setError(true);
        }
        setLoading(false);
    };

    const reset = () => {
        setIsOpen(false);
        setTimeout(() => {
            setStep('input');
            setEmail('');
            setTouched(false);
            setFocused(false);
            setLoading(false);
            setError(false);
        }, 500);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={`btn-gradient-border bg-[#1C4FD8] hover:bg-[#1946BF] active:bg-[#143899] text-white font-['Mulish'] font-semibold text-[16px] leading-[150%] text-center py-[20px] px-[40px] rounded-[16px] transition-all shadow-sm active:scale-[0.98] focus:outline-none flex items-center justify-center gap-4 inline-flex ${className}`}
                style={{ fontVariantNumeric: "lining-nums tabular-nums" }}
            >
                {Strings.join_beta}
            </button>

            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={reset}
                                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="bg-white rounded-[24px] w-full max-w-[560px] relative shadow-2xl z-10 overflow-hidden"
                            >
                                {/* Close button */}
                                <button
                                    onClick={reset}
                                    className="absolute z-20"
                                    style={{ top: 16, right: 16 }}
                                >
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/ic_close.svg`}
                                        alt="Close"
                                        style={{ width: 32, height: 32 }}
                                    />
                                </button>

                                {step === 'input' ? (
                                    <div className="flex flex-col p-[40px]">
                                        {/* Title */}
                                        <h2
                                            className="font-['Mulish'] text-[24px] font-bold leading-[130%] text-[#090924]"
                                            style={{ fontVariantNumeric: "lining-nums tabular-nums" }}
                                        >
                                            {Strings.beta_modal_title}
                                        </h2>

                                        {/* Description */}
                                        <p
                                            className="font-['Mulish'] text-[16px] font-semibold leading-[150%] text-[#090924] mt-[12px]"
                                            style={{ fontVariantNumeric: "lining-nums tabular-nums" }}
                                        >
                                            {Strings.beta_modal_description}
                                        </p>

                                        {/* Email field */}
                                        <div className="flex flex-col gap-[8px] mt-[32px]">
                                            <label
                                                className="font-['Mulish'] text-[16px] font-semibold leading-[150%] text-[#090924]"
                                                style={{ fontVariantNumeric: "lining-nums tabular-nums" }}
                                            >
                                                {Strings.beta_email_label}
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="example@gmail.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                onFocus={() => setFocused(true)}
                                                onBlur={() => { setTouched(true); setFocused(false); }}
                                                className="w-full outline-none font-['Mulish'] text-[16px] font-semibold text-[#090924] placeholder:text-[#A6A6BC]"
                                                style={{
                                                    display: 'flex',
                                                    padding: 16,
                                                    alignItems: 'center',
                                                    gap: 8,
                                                    alignSelf: 'stretch',
                                                    borderRadius: 8,
                                                    border: touched && email && !ValidationUtils.isValidEmail(email)
                                                        ? '1px solid #FF4C4C'
                                                        : focused
                                                            ? '1px solid #1C4FD8'
                                                            : '1px solid #D2D6E3',
                                                    background: '#FFF',
                                                    fontVariantNumeric: 'lining-nums tabular-nums',
                                                }}
                                            />
                                            {touched && email && !ValidationUtils.isValidEmail(email) && (
                                                <p
                                                    className="font-['Mulish'] text-[16px] font-semibold leading-[150%] text-[#FF4C4C] mt-[8px]"
                                                    style={{ fontVariantNumeric: "lining-nums tabular-nums" }}
                                                >
                                                    Невірний формат ел. пошти
                                                </p>
                                            )}
                                        </div>

                                        {/* Submit button */}
                                        <button
                                            onClick={handleSubmit}
                                            disabled={loading || !ValidationUtils.isValidEmail(email)}
                                            className="btn-gradient-border w-full bg-[#1C4FD8] hover:bg-[#1946BF] active:bg-[#143899] text-white font-['Mulish'] font-semibold text-[16px] leading-[150%] py-[20px] px-[40px] rounded-[16px] disabled:cursor-not-allowed transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-[16px] mt-[20px]"
                                            style={{ fontVariantNumeric: "lining-nums tabular-nums" }}
                                        >
                                            {loading ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    {Strings.beta_sending}
                                                </span>
                                            ) : (
                                                Strings.beta_send
                                            )}
                                        </button>

                                        {error && (
                                            <p className="font-['Mulish'] text-[14px] text-[#FF4C4C] font-semibold text-center mt-[12px]">
                                                {Strings.beta_error}
                                            </p>
                                        )}

                                        {/* Disclaimer */}
                                        <p
                                            className="font-['Mulish'] text-[12px] font-semibold leading-[150%] text-[#A6A6BC] text-center mt-[20px]"
                                            style={{ fontVariantNumeric: "lining-nums tabular-nums" }}
                                        >
                                            Натискаючи «Відправити», ви погоджуєтесь з нашими{' '}
                                            <a
                                                href="/beta-test/terms"
                                                className="text-[#1C4FD8] no-underline hover:underline transition-all"
                                                style={{ fontVariantNumeric: "lining-nums tabular-nums" }}
                                            >
                                                Умовами використання
                                            </a>
                                            {' '}та{' '}
                                            <a
                                                href="/beta-test/privacy"
                                                className="text-[#1C4FD8] no-underline hover:underline transition-all"
                                                style={{ fontVariantNumeric: "lining-nums tabular-nums" }}
                                            >
                                                Політикою конфіденційності
                                            </a>
                                            .
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center text-center p-[40px] animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="w-[144px] h-[144px] shrink-0 mb-[24px]" style={{ filter: 'drop-shadow(0 0 40px rgba(99, 214, 126, 0.40))' }}>
                                            <img src={`${import.meta.env.BASE_URL}assets/ic_success.svg`} alt="Success" className="w-[144px] h-[144px]" />
                                        </div>
                                        <h3
                                            className="font-['Mulish'] text-[24px] font-bold text-[#090924] mb-[12px] leading-[130%]"
                                            style={{ fontVariantNumeric: "lining-nums tabular-nums" }}
                                        >
                                            {Strings.beta_success_title}
                                        </h3>
                                        <p
                                            className="font-['Mulish'] text-[16px] text-[#090924] font-semibold mb-[12px] leading-[150%] whitespace-pre-line"
                                            style={{ fontVariantNumeric: "lining-nums tabular-nums" }}
                                        >
                                            {Strings.beta_success_description}
                                        </p>
                                        <p
                                            className="font-['Mulish'] text-[16px] text-[#090924] font-semibold mb-[40px] leading-[150%]"
                                            style={{ fontVariantNumeric: "lining-nums tabular-nums" }}
                                        >
                                            {Strings.beta_success_subtext}
                                        </p>
                                        <button
                                            onClick={reset}
                                            className="btn-gradient-border w-full bg-[#1C4FD8] hover:bg-[#1946BF] active:bg-[#143899] text-white font-['Mulish'] font-semibold text-[16px] leading-[150%] py-[20px] px-[40px] rounded-[16px] transition-all shadow-md active:scale-[0.98] flex items-center justify-center"
                                            style={{ fontVariantNumeric: "lining-nums tabular-nums" }}
                                        >
                                            {Strings.beta_understand}
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};
