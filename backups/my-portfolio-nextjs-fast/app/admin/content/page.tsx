import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import ContentEditor from "./content-editor";

export const dynamic = "force-dynamic";

export default async function ContentPage() {
  const authResult = await requireAdmin();
  if (!authResult.authorized) redirect("/admin/login");
  const content = await prisma.siteContent.findFirst();
  const services = Array.isArray(content?.services)
    ? content.services.filter(
        (item: unknown): item is { title: string; description: string } =>
          typeof item === "object" &&
          item !== null &&
          typeof (item as { title?: unknown }).title === "string" &&
          typeof (item as { description?: unknown }).description === "string",
      )
    : [];
  const whyItems = Array.isArray(content?.whyItems)
    ? content.whyItems
    : [];

  const editorContent = content
    ? {
        ...content,
        services,
        whyItems,
      }
    : null;

  return <main className="min-h-screen bg-slate-50 p-6 sm:p-10"><div className="mx-auto max-w-5xl"><div className="mb-8"><p className="text-xs font-black uppercase tracking-[0.25em] text-blue-600">Portfolio CMS</p><h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Homepage Content</h1><p className="mt-2 text-slate-500">Edit the words your visitors see without changing code.</p></div><ContentEditor initialContent={editorContent} /></div></main>;
}
