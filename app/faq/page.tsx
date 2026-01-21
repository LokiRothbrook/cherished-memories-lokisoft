import FaqClient from "./faq-client";
import type { Metadata } from "next";
import { faqPageContent } from "@/lib/data";

export const metadata: Metadata = {
    title: faqPageContent.title,
    description: faqPageContent.description,
};

export default function FAQPage() {
    return <FaqClient />;
}