"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

interface ToastProps {
    message: string;
    description?: string;
    type?: "success" | "error" | "info";
    onClose: () => void;
}

export function Toast({ message, description, type = "success", onClose }: ToastProps) {
    const icons = {
        success: <CheckCircle2 className="w-5 h-5" />,
        error: <AlertCircle className="w-5 h-5" />,
        info: <Info className="w-5 h-5" />,
    };

    const colors = {
        success: { bg: "white", text: "green" },
        error: { bg: "var(--color-destructive)", text: "var(--color-destructive-foreground)" },
        info: { bg: "white", text: "var(--color-foreground)" },
    };

    return (
        <motion.div
            initial={{ y: -50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-6 right-6 z-100 px-5 py-4 rounded-xl shadow-2xl max-w-sm"
            style={{
                background: colors[type].bg,
                color: colors[type].text,
            }}
        >
            <div className="flex items-start gap-3">
                <div className='flex gap-3 items-center'>
                    {icons[type]}
                    <div className="flex-1">
                        <div className="font-semibold text-sm">{message}</div>
                        {description && <div className="text-xs mt-1 opacity-90">{description}</div>}
                    </div>
                </div>
                <button onClick={onClose} className="opacity-70 hover:opacity-100 transition-opacity">
                    <X className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
}