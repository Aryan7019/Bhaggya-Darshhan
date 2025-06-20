import emailjs from '@emailjs/browser';
import { toast } from '@/components/ui/use-toast';

const SERVICE_ID = 'service_cs2zlx7';
const TEMPLATE_ID_SIGNUP = 'template_rhyzirc';
const TEMPLATE_ID_CONSULTATION = 'template_26pllzl';
const PUBLIC_KEY = 'MHJLn1TUuJZRK9NVz';

/**
 * Generic Email Sender using EmailJS
 */
const sendEmail = async (templateId, templateParams) => {
  try {
    await emailjs.send(SERVICE_ID, templateId, templateParams, PUBLIC_KEY);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Failed to send email:', error);

    const errorMessage = error?.text || '';

    if (errorMessage.includes("template_id")) {
      toast({
        title: "EmailJS Error",
        description: "Invalid Template ID. Check your EmailJS dashboard.",
        variant: "destructive",
      });
    } else if (errorMessage.includes("public_key")) {
      toast({
        title: "EmailJS Error",
        description: "Invalid Public Key. Check your EmailJS credentials.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Email Service Error",
        description: "Could not send email. Please verify your EmailJS setup.",
        variant: "destructive",
      });
    }
  }
};

/**
 * Send signup notification email to admin
 */
export const sendSignupNotification = (userData) => {
  const templateParams = {
    to_email: 'Rishabhg101@gmail.com',
    from_name: 'Bhaggya Darshhan Website',
    name: userData.name,
    email: userData.email,
    mobile: userData.phone, // ✅ match your EmailJS template variable
  };

  sendEmail(TEMPLATE_ID_SIGNUP, templateParams);
};

/**
 * Send consultation booking request email to admin
 */
export const sendConsultationRequest = (userData) => {
  const templateParams = {
    to_email: 'Rishabhg101@gmail.com',
    from_name: 'Bhaggya Darshhan Website',
    name: userData.name,
    email: userData.email,
    phone: userData.phone || 'Not provided',
    time: new Date().toLocaleString(),
    message: `The user wants to book a consultation.`,
  };

  sendEmail(TEMPLATE_ID_CONSULTATION, templateParams);
};
