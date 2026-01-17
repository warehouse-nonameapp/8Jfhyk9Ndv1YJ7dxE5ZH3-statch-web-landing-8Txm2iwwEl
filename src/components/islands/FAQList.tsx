import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";



interface FAQItemData {
    question: string;
    answer: string;
}

interface FAQListProps {
    data: FAQItemData[];
}

export const FAQList = ({ data }: FAQListProps) => {
    return (
        <div className="flex flex-col gap-4">
            {data.map((item, index) => (
                <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
        </div>
    );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="bg-surface rounded-[16px] md:rounded-[24px] border border-border-light overflow-hidden cursor-pointer hover:border-primary transition-colors"
            style={{ boxShadow: "0px 3px 0px 0px rgba(201, 209, 230, 0.2)" }}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="p-6 md:p-8 flex items-center justify-between gap-4">
                <h4 className="text-[16px] md:text-[24px] font-bold text-text-main flex-1">{question}</h4>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                >
                    <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10 text-[#CCCCE7]">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.824 14.421C9.475 13.77 10.53 13.77 11.181 14.421L20.003 23.243L28.824 14.421C29.475 13.77 30.53 13.77 31.181 14.421C31.832 15.072 31.832 16.127 31.181 16.778L21.181 26.778C20.53 27.429 19.475 27.429 18.824 26.778L8.824 16.778C8.173 16.127 8.173 15.072 8.824 14.421Z" fill="currentColor" />
                    </svg>
                </motion.div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-6 pb-6 md:px-8 md:pb-8">
                            <div className="bg-[#F8F8F8] rounded-[16px] p-4 md:p-6 text-text-main font-semibold text-sm md:text-base leading-relaxed md:w-[85%]">
                                {answer}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
