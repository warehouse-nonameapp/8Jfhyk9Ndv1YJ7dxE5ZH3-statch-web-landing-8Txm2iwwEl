import { useState } from 'react';
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
    const [selectedPlatform, setSelectedPlatform] = useState<string>('Both');
    const [step, setStep] = useState<'input' | 'success'>('input');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email || !ValidationUtils.isValidEmail(email)) {
            return;
        }

        setLoading(true);

        const success = await ApiService.signupToBeta(email, selectedPlatform);
        setLoading(false);

        if (success) {
            setStep('success');
            // Fire confetti celebration
            const end = Date.now() + 2000;
            const colors = ['#1C4FD8', '#2054E1', '#5B8EFF', '#ffffff', '#A8C4FF'];
            const frame = () => {
                confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.75 }, colors, zIndex: 99999 });
                confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.75 }, colors, zIndex: 99999 });
                if (Date.now() < end) requestAnimationFrame(frame);
            };
            frame();
        }
        // On failure: silently reset loading — user can retry
    };

    const reset = () => {
        setIsOpen(false);
        setTimeout(() => {
            setStep('input');
            setEmail('');
            setSelectedPlatform('Both');
            setLoading(false);
        }, 500);
    };


    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={`btn-gradient-border bg-[#1C4FD8] hover:bg-[#1946BF] active:bg-[#143899] text-white font-semibold text-base py-[20px] px-[40px] rounded-[16px] transition-all tracking-wide shadow-sm active:scale-[0.98] focus:outline-none flex items-center justify-center gap-4 inline-flex ${className}`}
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
                                className="absolute inset-0 bg-background-main/50 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="bg-surface rounded-[24px] w-full max-w-[656px] p-6 md:p-10 relative shadow-2xl z-10 overflow-hidden"
                            >
                                <button
                                    onClick={reset}
                                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 6L6 18M6 6L18 18" stroke="var(--color-text-main)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>

                                {step === 'input' ? (
                                    <div className="flex flex-col gap-8">
                                        <div className="space-y-2 text-center md:text-left">
                                            <h2 className="text-2xl md:text-[32px] font-extrabold text-text-main leading-tight">
                                                {Strings.beta_modal_title}
                                            </h2>
                                            <p className="text-text-main text-sm md:text-base font-semibold leading-relaxed">
                                                {Strings.beta_modal_description}
                                            </p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="flex flex-col gap-[8px]">
                                                <label className="text-base font-bold text-text-main">{Strings.beta_email_label}</label>
                                                <input
                                                    type="email"
                                                    placeholder={Strings.beta_email_placeholder}
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className={`w-full px-4 py-4 bg-secondary rounded-[16px] text-text-main placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary transition-all ${email && !ValidationUtils.isValidEmail(email)
                                                        ? 'ring-2 ring-error/50 focus:ring-error'
                                                        : ''
                                                        }`}
                                                />
                                            </div>

                                            <div className="flex flex-col gap-[8px]">
                                                <label className="text-base font-bold text-text-main">{Strings.beta_platform_label}</label>
                                                <div className="flex p-1 bg-[#E9EBF2] rounded-[12px] items-center">
                                                    {[
                                                        { id: 'Android', label: 'Android', icon: import.meta.env.BASE_URL + '/assets/ic_android.svg', iconClass: 'w-5 h-5' },
                                                        { id: 'iOS', label: 'iOS', icon: import.meta.env.BASE_URL + '/assets/ic_apple.svg', iconClass: 'w-4 h-auto' },
                                                        { id: 'Both', label: 'Обидві' }
                                                    ].map((platformOption, index, arr) => {
                                                        const isSelected = selectedPlatform === platformOption.id;
                                                        const isNextSelected = index < arr.length - 1 && selectedPlatform === arr[index + 1].id;

                                                        return (
                                                            <div key={platformOption.id} className="flex-1 flex items-center">
                                                                <button
                                                                    onClick={() => setSelectedPlatform(platformOption.id)}
                                                                    className={`flex-1 py-3 rounded-[8px] text-sm md:text-base font-semibold transition-all duration-200 ${isSelected
                                                                        ? 'bg-surface text-text-main shadow-sm'
                                                                        : 'text-text-secondary-variant hover:text-text-main'
                                                                        }`}
                                                                >
                                                                    <div className="flex items-center justify-center gap-2">
                                                                        {platformOption.icon && (
                                                                            <img src={platformOption.icon} alt={platformOption.label} className={platformOption.iconClass} />
                                                                        )}
                                                                        <span>{platformOption.label}</span>
                                                                    </div>
                                                                </button>
                                                                {index < arr.length - 1 && !isSelected && !isNextSelected && (
                                                                    <div className="w-[1px] h-8 bg-[#D2D6E3] mx-1" />
                                                                )}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleSubmit}
                                            disabled={loading || !email}
                                            className="btn-gradient-border w-full bg-[#1C4FD8] hover:bg-[#1946BF] active:bg-[#143899] text-white font-semibold text-base py-[20px] px-[40px] rounded-[16px] disabled:cursor-not-allowed transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-[16px] inline-flex"
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

                                        <p className="text-xs text-text-secondary-variant leading-relaxed text-center">
                                            Натискаючи «Надіслати», ви погоджуєтесь з нашими{' '}
                                            <a href={import.meta.env.BASE_URL + '/terms'} className="underline hover:text-text-main transition-colors" target="_blank">
                                                Умовами використання
                                            </a>
                                            {' '}та{' '}
                                            <a href={import.meta.env.BASE_URL + '/privacy'} className="underline hover:text-text-main transition-colors" target="_blank">
                                                Політикою конфіденційності
                                            </a>
                                            .
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center text-center py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="w-36 h-36 mb-6">
                                            <img src={import.meta.env.BASE_URL + "/assets/ic_success.svg"} alt="Success" className="w-full h-full object-contain" />
                                        </div>
                                        <h3 className="text-[32px] font-extrabold text-text-main mb-4">{Strings.beta_success_title}</h3>
                                        <p className="text-text-main font-semibold mb-2 whitespace-pre-line">
                                            {Strings.beta_success_description}
                                        </p>
                                        <p className="text-text-secondary-variant mb-12">
                                            {Strings.beta_success_subtext}
                                        </p>
                                        <button
                                            onClick={reset}
                                            className="btn-gradient-border w-full bg-[#1C4FD8] hover:bg-[#1946BF] active:bg-[#143899] text-white font-semibold text-base py-[20px] px-[40px] rounded-[16px] transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-[16px] inline-flex"
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
