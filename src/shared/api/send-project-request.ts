import emailjs from "@emailjs/browser";

type ProjectRequest = {
  name: string;
  email: string;
  contact: string;
  message: string;
  consent: boolean;
};

export async function sendProjectRequest(
  data: ProjectRequest,
): Promise<void> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      "Не заполнены настройки EmailJS. Проверь файл .env.local.",
    );
  }

  const name = data.name.trim();
  const email = data.email.trim();
  const message = data.message.trim();

  if (!name || !email || !message || !data.consent) {
    throw new Error(
      "Заполни обязательные поля и подтверди согласие.",
    );
  }

  await emailjs.send(
    serviceId,
    templateId,
    {
      name,
      email,
      contact: data.contact.trim() || "Не указан",
      message,
      consent: "Пользователь отметил согласие в форме",
    },
    {
      publicKey,
    },
  );
}