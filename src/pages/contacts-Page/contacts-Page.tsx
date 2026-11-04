import ProjectContact from "@/shared/ui/wedgets/projectContact/projectContact";
import Footer from "@/shared/ui/wedgets/footer/footer";
import { sendProjectRequest } from "@/shared/api/send-project-request";

export default function ContactsPage() {
  return (
    <div>
      <main>
        <ProjectContact onSubmit={sendProjectRequest} />
      </main>
      <Footer />
    </div>
  );
}
