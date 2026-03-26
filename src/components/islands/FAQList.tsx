import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Locale = 'uk' | 'en';

interface FAQItemData {
    question?: string;
    answer?: string;
    question_uk?: string;
    answer_uk?: string;
    question_en?: string;
    answer_en?: string;
}

interface FAQListProps {
    data: FAQItemData[];
}

function useLocale(): Locale {
    // Always start with 'uk' for SSR — actual locale is synced in useEffect
    const [locale, setLocale] = useState<Locale>('uk');

    useEffect(() => {
        const saved = localStorage.getItem('locale');
        if (saved === 'uk' || saved === 'en') {
            setLocale(saved);
        }

        const handleLocaleChange = (e: Event) => {
            const customEvent = e as CustomEvent<{ locale: Locale }>;
            if (customEvent.detail?.locale) {
                setLocale(customEvent.detail.locale);
            }
        };

        window.addEventListener('localechange', handleLocaleChange);
        return () => {
            window.removeEventListener('localechange', handleLocaleChange);
        };
    }, []);

    return locale;
}

export const FAQList = ({ data }: FAQListProps) => {
    const locale = useLocale();

    return (
        <div className="flex flex-col gap-2">
            {data.map((item, index) => {
                const question = locale === 'en'
                    ? (item.question_en || item.question || '')
                    : (item.question_uk || item.question || '');
                const answer = locale === 'en'
                    ? (item.answer_en || item.answer || '')
                    : (item.answer_uk || item.answer || '');
                return (
                    <FAQItem key={index} question={question} answer={answer} />
                );
            })}
        </div>
    );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="bg-[#FFF] rounded-[24px] border border-[#E3EAF1] overflow-hidden cursor-pointer hover:border-primary transition-colors flex flex-col items-start self-stretch p-5 md:px-[40px] md:py-[32px] w-full"
            style={{ boxShadow: "0 8px 16px 0 rgba(201, 209, 230, 0.20)" }}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="w-full flex items-center justify-between gap-[16px]">
                <h4 className="text-[16px] md:text-[24px] font-bold text-text-main flex-1 tabular-nums lining-nums leading-[130%]">{question}</h4>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="shrink-0"
                >
                    <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-10 md:h-10 text-[#CCCCE7]">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.824 14.421C9.475 13.77 10.53 13.77 11.181 14.421L20.003 23.243L28.824 14.421C29.475 13.77 30.53 13.77 31.181 14.421C31.832 15.072 31.832 16.127 31.181 16.778L21.181 26.778C20.53 27.429 19.475 27.429 18.824 26.778L8.824 16.778C8.173 16.127 8.173 15.072 8.824 14.421Z" fill="currentColor" />
                    </svg>
                </motion.div>
            </div>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        className="w-full overflow-hidden"
                    >
                        <div className="bg-[#F8F8F8] rounded-[8px] md:rounded-[16px] flex p-4 md:px-[24px] md:py-[16px] items-center text-text-main font-semibold text-[14px] md:text-base leading-[150%] w-full md:w-[calc(100%-120px)]">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
