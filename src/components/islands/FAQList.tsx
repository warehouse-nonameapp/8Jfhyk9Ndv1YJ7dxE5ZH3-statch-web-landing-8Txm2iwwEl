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
            className="bg-[#FFF] rounded-[24px] border border-[#E3EAF1] overflow-hidden cursor-pointer hover:border-primary transition-colors flex flex-col items-center self-stretch px-[32px] md:px-[40px] py-[32px] w-full"
            style={{ boxShadow: "0 8px 16px 0 rgba(201, 209, 230, 0.20)" }}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="w-full flex items-center justify-between gap-[16px]">
                <h4 className="text-[16px] md:text-[24px] font-bold text-text-main flex-1">{question}</h4>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="shrink-0"
                >
                    <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10 text-[#CCCCE7]">
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
                        <div className="bg-[#F8F8F8] rounded-[16px] p-4 md:p-6 text-text-main font-semibold text-sm md:text-base leading-relaxed w-full">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
