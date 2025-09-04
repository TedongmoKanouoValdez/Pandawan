"use client";
import { useParams } from "next/navigation";
import ArticlePage from "@/components/pages/ArticlePage";
import { DateRangeProvider } from "@/context/DateRangeContext";

export default function Page() {
  const params = useParams();
  const slug = params.slug; // slug de l’article

  return (
    <DateRangeProvider>
      <ArticlePage slug={slug} />
    </DateRangeProvider>
  );
}
