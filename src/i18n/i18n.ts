import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Initialize i18next with resources directly
i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // initialize i18next
  .init({
    resources: {
      en: {
        translation: {
          topBar: {
            language: "Language"
          },
          navbar: {
            home: "Home",
            keyIssues: "Key Issues",
            media: "Media",
            joinMovement: "Join Movement",
            contactUs: "Contact Us"
          },
          hero: {
            title: "Education for All",
            subtitle: "Empowering through knowledge",
            raiseIssue: "Raise Issue"
          },
          keyIssues: {
            title: "Key Issues",
            description: "The most pressing educational challenges we're addressing"
          },
          media: {
            title: "Media",
            description: "Our impact in the news and social media"
          },
          joinMovement: {
            title: "Join the Movement",
            description: "Be part of the educational reform",
            joinButton: "Join Now"
          },
          contactUs: {
            title: "Contact Us",
            name: "Your Name",
            email: "Email Address",
            message: "Your Message",
            sendButton: "Send Message"
          },
          footer: {
            rights: "All Rights Reserved",
            raiseIssue: "Raise Issue"
          },
          raiseIssue: {
            title: "Raise an Issue",
            name: "Your Name",
            email: "Email Address",
            organization: "Institute/College/Organization Name",
            issue: "Describe the Issue",
            submit: "Submit Issue"
          }
        }
      },
      hi: {
        translation: {
          topBar: {
            language: "भाषा"
          },
          navbar: {
            home: "होम",
            keyIssues: "मुख्य मुद्दे",
            media: "मीडिया",
            joinMovement: "आंदोलन में शामिल हों",
            contactUs: "संपर्क करें"
          },
          hero: {
            title: "सभी के लिए शिक्षा",
            subtitle: "ज्ञान के माध्यम से सशक्तिकरण",
            raiseIssue: "मुद्दा उठाएं"
          },
          keyIssues: {
            title: "मुख्य मुद्दे",
            description: "हम जिन शैक्षिक चुनौतियों का समाधान कर रहे हैं"
          },
          media: {
            title: "मीडिया",
            description: "समाचारों और सोशल मीडिया में हमारा प्रभाव"
          },
          joinMovement: {
            title: "आंदोलन में शामिल हों",
            description: "शैक्षिक सुधार का हिस्सा बनें",
            joinButton: "अभी शामिल हों"
          },
          contactUs: {
            title: "संपर्क करें",
            name: "आपका नाम",
            email: "ईमेल पता",
            message: "आपका संदेश",
            sendButton: "संदेश भेजें"
          },
          footer: {
            rights: "सर्वाधिकार सुरक्षित",
            raiseIssue: "मुद्दा उठाएं"
          },
          raiseIssue: {
            title: "मुद्दा उठाएं",
            name: "आपका नाम",
            email: "ईमेल पता",
            organization: "संस्थान/कॉलेज/संगठन का नाम",
            issue: "मुद्दे का विवरण दें",
            submit: "मुद्दा जमा करें"
          }
        }
      },
      mr: {
        translation: {
          topBar: {
            language: "भाषा"
          },
          navbar: {
            home: "मुख्यपृष्ठ",
            keyIssues: "महत्त्वाचे मुद्दे",
            media: "माध्यमे",
            joinMovement: "चळवळीत सामील व्हा",
            contactUs: "संपर्क करा"
          },
          hero: {
            title: "सर्वांसाठी शिक्षण",
            subtitle: "ज्ञानाच्या माध्यमातून सक्षमीकरण",
            raiseIssue: "मुद्दा उपस्थित करा"
          },
          keyIssues: {
            title: "महत्त्वाचे मुद्दे",
            description: "आम्ही संबोधित करत असलेल्या शैक्षणिक आव्हाने"
          },
          media: {
            title: "माध्यमे",
            description: "बातम्या आणि सोशल मीडियावरील आमचा प्रभाव"
          },
          joinMovement: {
            title: "चळवळीत सामील व्हा",
            description: "शैक्षणिक सुधारणेचा एक भाग बना",
            joinButton: "आता सामील व्हा"
          },
          contactUs: {
            title: "संपर्क करा",
            name: "आपले नाव",
            email: "ईमेल पत्ता",
            message: "आपला संदेश",
            sendButton: "संदेश पाठवा"
          },
          footer: {
            rights: "सर्व हक्क राखीव",
            raiseIssue: "मुद्दा उपस्थित करा"
          },
          raiseIssue: {
            title: "मुद्दा उपस्थित करा",
            name: "आपले नाव",
            email: "ईमेल पत्ता",
            organization: "संस्था/महाविद्यालय/संघटना नाव",
            issue: "मुद्द्याचे वर्णन करा",
            submit: "मुद्दा सादर करा"
          }
        }
      }
    },
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

export default i18n;
