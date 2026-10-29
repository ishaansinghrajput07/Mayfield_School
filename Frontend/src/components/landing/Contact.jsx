import { useState } from "react";
import { Mail, MapPin, Phone, Facebook, Instagram, Youtube } from "lucide-react";
import toast from "react-hot-toast";
import useReveal from "../../hooks/useReveal";
import SectionHeading from "./SectionHeading";
import { photos } from "../../assets/school";
import { SCHOOL, fullAddress } from "../../config/school";
import { contactInquiriesApi } from "../../api/endpoints";

export default function Contact() {
  const ref = useReveal();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const updateForm = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setSending(true);
    try {
      const { data } = await contactInquiriesApi.submit(form);
      setSent(true);
      setForm({ name: "", phone: "", email: "", message: "" });
      toast.success(data.message || "Message sent");
    } catch (error) {
      toast.error(error.response?.data?.message || "Couldn't send your message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="bg-paper">
      <div ref={ref} className="reveal mx-auto max-w-site">
        <SectionHeading title="Contact the school">
          Questions about admissions, fees or a visit? Call the office or send us a message.
        </SectionHeading>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1fr_0.9fr] lg:items-start">
          {/* Column 1 - contact details */}
          <div className="rounded-2xl border border-navy-100 bg-white p-6">
            <h3 className="font-serif text-xl font-bold text-navy-900">Office contacts</h3>
            <div className="mt-5 space-y-5">
              <ContactRow icon={Phone} title="Phone">
                {SCHOOL.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="block hover:text-school-red">
                    {p.display}
                  </a>
                ))}
              </ContactRow>
              <ContactRow icon={Mail} title="Email">
                {SCHOOL.emails.map((e) => (
                  <a key={e} href={`mailto:${e}`} className="block break-all hover:text-school-red">
                    {e}
                  </a>
                ))}
              </ContactRow>
              <ContactRow icon={MapPin} title="Campus address">
                <span className="block">{fullAddress}</span>
              </ContactRow>
            </div>
          </div>

          {/* Column 2 - contact form */}
          <div className="flex flex-col rounded-2xl border border-navy-100 bg-white p-6">
            {sent ? (
              <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
                <p className="font-serif text-xl font-bold text-navy-900">Message sent</p>
                <p className="mt-1 text-base text-navy-500">The school office will get back to you.</p>
                <button type="button" onClick={() => setSent(false)} className="mt-4 text-base font-semibold text-school-red hover:text-school-red-dark">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-4">
                <div>
                  <label className="label" htmlFor="contact-name">Parent's name</label>
                  <input id="contact-name" required name="name" maxLength={100} value={form.name} onChange={updateForm} className="input" placeholder="Your name" />
                </div>
                <div>
                  <label className="label" htmlFor="contact-phone">Phone number</label>
                  <input id="contact-phone" required name="phone" type="tel" maxLength={30} value={form.phone} onChange={updateForm} className="input" placeholder="Your phone number" />
                </div>
                <div>
                  <label className="label" htmlFor="contact-email">Email</label>
                  <input id="contact-email" required name="email" type="email" maxLength={254} value={form.email} onChange={updateForm} className="input" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="label" htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" required name="message" rows={4} maxLength={2000} value={form.message} onChange={updateForm} className="input" placeholder="Tell us how we can help" />
                </div>
                <button type="submit" disabled={sending} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
                  {sending ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </div>

          {/* Column 3 - map, campus, social */}
          <div className="flex flex-col gap-5">
            <div className="overflow-hidden rounded-2xl border border-navy-100">
              <iframe
                title="Mayfield Global School location"
                src={SCHOOL.mapEmbed}
                className="block h-[200px] w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-4">
              <img src={photos.campusBuilding} alt="The school building" className="h-16 w-20 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0">
                <p className="text-base font-bold text-navy-900">Neora Ganjpar, Patna</p>
                <p className="text-sm text-navy-500">Sarai Neoraganj Road, {SCHOOL.address.pin}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-navy-100 bg-white p-5">
              <p className="text-base font-bold text-navy-900">Follow us</p>
              <div className="mt-3 flex items-center gap-3">
                {[
                  { Icon: Facebook, href: SCHOOL.social.facebook, label: "Facebook" },
                  { Icon: Instagram, href: SCHOOL.social.instagram, label: "Instagram" },
                  { Icon: Youtube, href: SCHOOL.social.youtube, label: "YouTube" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${SCHOOL.name} on ${label}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-100 text-navy-600 transition-colors hover:border-school-red hover:text-school-red"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
              <p className="mt-3 text-sm text-navy-500">Instagram: {SCHOOL.social.instagramHandles.join(" or ")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, title, children }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-school-red">
        <Icon size={17} />
      </span>
      <div className="min-w-0">
        <p className="text-sm text-navy-500">{title}</p>
        <div className="mt-0.5 text-base font-semibold leading-snug text-navy-800">{children}</div>
      </div>
    </div>
  );
}
