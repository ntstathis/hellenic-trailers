// ============================================
// HELLENIC TRAILERS - Translation System
// Bilingual: English / Greek
// ============================================

const translations = {
  // Navigation
  'nav.home': { en: 'Home', el: 'Αρχική' },
  'nav.about': { en: 'The Company', el: 'Η Εταιρεία' },
  'nav.products': { en: 'Products', el: 'Προϊόντα' },
  'nav.services': { en: 'Services', el: 'Υπηρεσίες' },
  'nav.gallery': { en: 'Gallery', el: 'Συλλογή' },
  'nav.news': { en: 'News', el: 'Νέα' },
  'nav.contact': { en: 'Contact', el: 'Επικοινωνία' },

  // Top bar
  'topbar.phone': { en: '+30 210 555 0000', el: '+30 210 555 0000' },
  'topbar.email': { en: 'info@hellenictrailers.gr', el: 'info@hellenictrailers.gr' },
  'topbar.hours': { en: 'Mon-Fri: 08:00 - 17:00', el: 'Δευ-Παρ: 08:00 - 17:00' },

  // Logo
  'logo.tagline': { en: 'Official Lamberet Representative in Greece', el: 'Επίσημος Αντιπρόσωπος Lamberet στην Ελλάδα' },

  // Hero - Home
  'hero.badge': { en: '❄ Official Lamberet Partner in Greece', el: '❄ Επίσημος Συνεργάτης Lamberet στην Ελλάδα' },
  'hero.title': { en: 'Refrigerated Transport Solutions for Greece', el: 'Λύσεις Ψυκτικής Μεταφοράς για την Ελλάδα' },
  'hero.subtitle': { en: 'Hellenic Trailers is the exclusive representative of Lamberet in Greece, offering the complete range of Europe\'s leading refrigerated vehicle manufacturer. Based at the Theologis Group facilities in Mandra, we provide sales, service, and spare parts for the entire Lamberet product line.', el: 'Η Hellenic Trailers είναι ο αποκλειστικός αντιπρόσωπος της Lamberet στην Ελλάδα, προσφέροντας την πλήρη γκάμα του κορυφαίου Ευρωπαίου κατασκευαστή ψυκτικών οχημάτων. Με έδρα τις εγκαταστάσεις του Theologis Group στη Μάνδρα, παρέχουμε πωλήσεις, σέρβις και ανταλλακτικά για όλη τη γκάμα Lamberet.' },
  'hero.cta1': { en: 'View Products', el: 'Δείτε τα Προϊόντα' },
  'hero.cta2': { en: 'Contact Us', el: 'Επικοινωνήστε' },

  // Features - Home
  'features.title': { en: 'Why Choose Hellenic Trailers', el: 'Γιατί να Επιλέξετε την Hellenic Trailers' },
  'features.subtitle': { en: 'Your trusted partner for refrigerated transport solutions in Greece', el: 'Ο έμπιστος συνεργάτης σας για λύσεις ψυκτικής μεταφοράς στην Ελλάδα' },
  'features.1.title': { en: 'Official Lamberet Dealer', el: 'Επίσημος Αντιπρόσωπος Lamberet' },
  'features.1.text': { en: 'As the exclusive Lamberet representative in Greece, we offer the full product range backed by factory support and genuine parts.', el: 'Ως αποκλειστικός αντιπρόσωπος Lamberet στην Ελλάδα, προσφέρουμε την πλήρη γκάμα προϊόντων με εργοστασιακή υποστήριξη και γνήσια ανταλλακτικά.' },
  'features.2.title': { en: 'Expert Service & Support', el: 'Εξειδικευμένο Σέρβις & Υποστήριξη' },
  'features.2.text': { en: 'Located at the Theologis Group 15,000 m² facilities in Mandra, with over 40 years of industry experience in repairs and maintenance.', el: 'Στις εγκαταστάσεις 15.000 τ.μ. του Theologis Group στη Μάνδρα, με πάνω από 40 χρόνια εμπειρίας στις επισκευές και τη συντήρηση.' },
  'features.3.title': { en: 'Complete Cold Chain', el: 'Πλήρης Ψυκτική Αλυσίδα' },
  'features.3.text': { en: 'From small vans to full-size semi-trailers, we cover every cold chain need with mono and multi-temperature solutions.', el: 'Από μικρά βαν μέχρι πλήρη νταλίκες, καλύπτουμε κάθε ανάγκη ψυκτικής αλυσίδας με λύσεις μονής και πολλαπλής θερμοκρασίας.' },

  // Stats
  'stats.1.number': { en: '40+', el: '40+' },
  'stats.1.label': { en: 'Years of Experience', el: 'Χρόνια Εμπειρίας' },
  'stats.2.number': { en: '15,000', el: '15.000' },
  'stats.2.label': { en: 'm² Facilities', el: 'τ.μ. Εγκαταστάσεις' },
  'stats.3.number': { en: '#1', el: '#1' },
  'stats.3.label': { en: 'in European Refrigerated Vehicles', el: 'στα Ευρωπαϊκά Ψυκτικά Οχήματα' },
  'stats.4.number': { en: '1935', el: '1935' },
  'stats.4.label': { en: 'Lamberet Founded', el: 'Ίδρυση Lamberet' },

  // Products section
  'products.title': { en: 'Lamberet Product Range', el: 'Γκάμα Προϊόντων Lamberet' },
  'products.subtitle': { en: 'The complete range of refrigerated transport solutions from Europe\'s leading manufacturer', el: 'Η πλήρης γκάμα ψυκτικών λύσεων μεταφοράς από τον κορυφαίο κατασκευαστή της Ευρώπης' },

  'products.semi.title': { en: 'Refrigerated Semi-Trailers', el: 'Ψυκτικά Ημιρυμουλκούμενα' },
  'products.semi.text': { en: 'The SR2 range offers industry-leading insulation and reliability for long-haul temperature-controlled transport. Available in Green Liner, Heavy Duty, Super Beef, Super Duplex, Super City, and CX System configurations.', el: 'Η σειρά SR2 προσφέρει κορυφαία μόνωση και αξιοπιστία για μεταφορές ελεγχόμενης θερμοκρασίας μεγάλων αποστάσεων. Διαθέσιμη σε εκδόσεις Green Liner, Heavy Duty, Super Beef, Super Duplex, Super City και CX System.' },
  'products.semi.tag1': { en: 'Mono-Temperature', el: 'Μονής Θερμοκρασίας' },
  'products.semi.tag2': { en: 'Multi-Temperature', el: 'Πολλαπλής Θερμοκρασίας' },

  'products.truck.title': { en: 'Truck Bodies', el: 'Υπερκατασκευές Φορτηγών' },
  'products.truck.text': { en: 'Rigid truck bodies designed for urban and regional distribution, with exceptional insulation performance and durability for daily cold chain operations.', el: 'Υπερκατασκευές φορτηγών σχεδιασμένες για αστική και περιφερειακή διανομή, με εξαιρετική μόνωση και αντοχή για καθημερινές λειτουργίες ψυκτικής αλυσίδας.' },
  'products.truck.tag1': { en: 'Urban Distribution', el: 'Αστική Διανομή' },
  'products.truck.tag2': { en: 'Regional', el: 'Περιφερειακή' },

  'products.van.title': { en: 'Refrigerated Vans', el: 'Ψυκτικά Βαν' },
  'products.van.text': { en: 'Compact refrigerated van conversions for last-mile delivery and small-scale cold chain transport. Perfect for urban food delivery and pharmaceutical logistics.', el: 'Ψυκτικές μετατροπές βαν για παράδοση τελευταίου χιλιομέτρου και μεταφορά ψυκτικής αλυσίδας μικρής κλίμακας. Ιδανικό για αστική διανομή τροφίμων και φαρμακευτική εφοδιαστική.' },
  'products.van.tag1': { en: 'Last-Mile', el: 'Τελευταίο Χιλιόμετρο' },
  'products.van.tag2': { en: 'Pharma', el: 'Φαρμακευτική' },

  'products.kerstner.title': { en: 'Kerstner Refrigeration Units', el: 'Ψυκτικά Μηχανήματα Kerstner' },
  'products.kerstner.text': { en: 'Electric refrigeration units by Kerstner, a Lamberet subsidiary. The widest range of electrically-driven refrigeration units for vans, with roof-integrated evaporation technology and silent operation.', el: 'Ηλεκτρικά ψυκτικά μηχανήματα Kerstner, θυγατρική της Lamberet. Η μεγαλύτερη γκάμα ηλεκτρικών ψυκτικών μηχανημάτων για βαν, με ενσωματωμένη τεχνολογία εξάτμισης στην οροφή και αθόρυβη λειτουργία.' },
  'products.kerstner.tag1': { en: 'Electric', el: 'Ηλεκτρικό' },
  'products.kerstner.tag2': { en: 'Silent', el: 'Αθόρυβο' },

  'products.sr2.title': { en: 'SR2 Semi-Trailer Range', el: 'Γκάμα Ημιρυμουλκούμενων SR2' },
  'products.sr2.greenliner': { en: 'The flagship model, combining outstanding thermal performance with environmental responsibility. Industry-leading insulation with 70mm walls.', el: 'Το κορυφαίο μοντέλο, που συνδυάζει εξαιρετική θερμομονωτική απόδοση με περιβαλλοντική υπευθυνότητα. Κορυφαία μόνωση με τοιχώματα 70mm.' },
  'products.sr2.heavyduty': { en: 'Reinforced construction for the most demanding operations. Ideal for meat rails, heavy loads, and intensive daily use.', el: 'Ενισχυμένη κατασκευή για τις πιο απαιτητικές λειτουργίες. Ιδανικό για κρεμάστρες κρεάτων, βαριά φορτία και εντατική καθημερινή χρήση.' },
  'products.sr2.superbeef': { en: 'Specifically designed for hanging meat transport with reinforced roof structure and optimized interior configuration.', el: 'Ειδικά σχεδιασμένο για τη μεταφορά κρεμαστών κρεάτων με ενισχυμένη δομή οροφής και βελτιστοποιημένη εσωτερική διαμόρφωση.' },
  'products.sr2.superduplex': { en: 'Multi-temperature configuration allowing simultaneous transport of frozen and chilled goods in separate compartments.', el: 'Διαμόρφωση πολλαπλών θερμοκρασιών που επιτρέπει την ταυτόχρονη μεταφορά κατεψυγμένων και συντηρημένων προϊόντων σε ξεχωριστά διαμερίσματα.' },

  // Services
  'services.title': { en: 'Our Services', el: 'Οι Υπηρεσίες μας' },
  'services.subtitle': { en: 'Comprehensive support for your refrigerated transport fleet', el: 'Ολοκληρωμένη υποστήριξη για τον ψυκτικό σας στόλο' },
  'services.sales.title': { en: 'Sales & Consultation', el: 'Πωλήσεις & Συμβουλευτική' },
  'services.sales.text': { en: 'Expert guidance to help you choose the right Lamberet solution for your cold chain requirements.', el: 'Εξειδικευμένη καθοδήγηση για να επιλέξετε τη σωστή λύση Lamberet για τις ανάγκες ψυκτικής αλυσίδας σας.' },
  'services.sales.li1': { en: 'Full Lamberet product range', el: 'Πλήρης γκάμα Lamberet' },
  'services.sales.li2': { en: 'Custom configuration advice', el: 'Συμβουλές εξατομικευμένης διαμόρφωσης' },
  'services.sales.li3': { en: 'Financing options', el: 'Επιλογές χρηματοδότησης' },
  'services.maintenance.title': { en: 'Maintenance & Repairs', el: 'Συντήρηση & Επισκευές' },
  'services.maintenance.text': { en: 'Keep your fleet running at peak performance with our factory-trained technicians.', el: 'Κρατήστε τον στόλο σας σε κορυφαία απόδοση με τους εργοστασιακά εκπαιδευμένους τεχνικούς μας.' },
  'services.maintenance.li1': { en: 'Scheduled maintenance programs', el: 'Προγράμματα τακτικής συντήρησης' },
  'services.maintenance.li2': { en: 'Body and chassis repairs', el: 'Επισκευές αμαξώματος και πλαισίου' },
  'services.maintenance.li3': { en: 'Refrigeration unit service', el: 'Σέρβις ψυκτικών μονάδων' },
  'services.parts.title': { en: 'Genuine Spare Parts', el: 'Γνήσια Ανταλλακτικά' },
  'services.parts.text': { en: 'Genuine Lamberet parts ensuring optimal performance and longevity for your equipment.', el: 'Γνήσια ανταλλακτικά Lamberet που εξασφαλίζουν βέλτιστη απόδοση και μακροζωία του εξοπλισμού σας.' },
  'services.parts.li1': { en: 'OEM parts in stock', el: 'Ανταλλακτικά OEM σε απόθεμα' },
  'services.parts.li2': { en: 'Fast delivery nationwide', el: 'Γρήγορη παράδοση πανελλαδικά' },
  'services.parts.li3': { en: 'Warranty coverage', el: 'Κάλυψη εγγύησης' },
  'services.bodyshop.title': { en: 'Body Shop & Constructions', el: 'Φανοποιείο & Κατασκευές' },
  'services.bodyshop.text': { en: 'Specialized bodywork and custom constructions leveraging the expertise of the Theologis Group.', el: 'Εξειδικευμένες εργασίες φανοποιίας και κατασκευές αξιοποιώντας την τεχνογνωσία του Theologis Group.' },
  'services.bodyshop.li1': { en: 'Collision repair', el: 'Επισκευές από σύγκρουση' },
  'services.bodyshop.li2': { en: 'Custom builds', el: 'Κατασκευές κατά παραγγελία' },
  'services.bodyshop.li3': { en: 'Paint and finishing', el: 'Βαφή και φινίρισμα' },

  // Gallery
  'gallery.title': { en: 'Gallery', el: 'Συλλογή Φωτογραφιών' },
  'gallery.subtitle': { en: 'See our facilities and Lamberet products in action', el: 'Δείτε τις εγκαταστάσεις μας και τα προϊόντα Lamberet' },

  // News
  'news.title': { en: 'Latest News', el: 'Τελευταία Νέα' },
  'news.subtitle': { en: 'Stay updated with the latest from Hellenic Trailers and Lamberet', el: 'Μείνετε ενημερωμένοι με τα τελευταία νέα' },
  'news.1.date': { en: 'March 2026', el: 'Μάρτιος 2026' },
  'news.1.title': { en: 'Hellenic Trailers Launches as Lamberet Greece', el: 'Η Hellenic Trailers ξεκινά ως Lamberet Greece' },
  'news.1.text': { en: 'We are proud to announce our partnership with Lamberet as their official representative in Greece.', el: 'Είμαστε υπερήφανοι που ανακοινώνουμε τη συνεργασία μας με τη Lamberet ως επίσημος αντιπρόσωπος στην Ελλάδα.' },
  'news.2.date': { en: 'February 2026', el: 'Φεβρουάριος 2026' },
  'news.2.title': { en: 'SR2 Green Liner Now Available in Greece', el: 'Το SR2 Green Liner Διαθέσιμο στην Ελλάδα' },
  'news.2.text': { en: 'The latest SR2 Green Liner semi-trailer is now available for order through Hellenic Trailers.', el: 'Το τελευταίο ημιρυμουλκούμενο SR2 Green Liner είναι πλέον διαθέσιμο για παραγγελία.' },
  'news.3.date': { en: 'January 2026', el: 'Ιανουάριος 2026' },
  'news.3.title': { en: 'New 15,000 m² Service Center in Mandra', el: 'Νέο Κέντρο Σέρβις 15.000 τ.μ. στη Μάνδρα' },
  'news.3.text': { en: 'Our state-of-the-art service center at the Theologis Group facilities is fully operational.', el: 'Το υπερσύγχρονο κέντρο σέρβις μας στις εγκαταστάσεις του Theologis Group λειτουργεί πλήρως.' },

  'news.4.date': { en: 'May 2026', el: 'Μάιος 2026' },
  'news.4.title': { en: 'Super Beef Meat Chamber Delivery to Farma Mitsopoulos', el: 'Παράδοση Super Beef κρεατάδικου θαλάμου στη Φάρμα Μητσόπουλος' },
  'news.4.text': { en: 'We successfully delivered a Lamberet SR2 Super Beef semi-trailer to Farma Mitsopoulos. The chamber is specifically designed for hanging meat transport with reinforced roof structure and optimized interior configuration.', el: 'Με επιτυχία ολοκληρώθηκε η παράδοση ενός ημιρυμουλκούμενου Lamberet SR2 Super Beef στη Φάρμα Μητσόπουλος. Ο θάλαμος είναι ειδικά σχεδιασμένος για τη μεταφορά κρεμαστών κρεάτων με ενισχυμένη δομή οροφής και βελτιστοποιημένη εσωτερική διαμόρφωση.' },

  // Testimonials
  'testimonials.title': { en: 'What Our Clients Say', el: 'Τι Λένε οι Πελάτες μας' },
  'testimonials.1.text': { en: 'Hellenic Trailers provided us with the perfect cold chain solution for our nationwide food distribution network. The Lamberet SR2 trailers are exceptional in quality and reliability.', el: 'Η Hellenic Trailers μας παρείχε την τέλεια λύση ψυκτικής αλυσίδας για το πανελλαδικό δίκτυο διανομής τροφίμων μας. Τα ρυμουλκούμενα Lamberet SR2 είναι εξαιρετικά σε ποιότητα και αξιοπιστία.' },
  'testimonials.1.name': { en: 'Giorgos K.', el: 'Γιώργος Κ.' },
  'testimonials.1.role': { en: 'Fleet Manager, Fresh Foods S.A.', el: 'Διευθυντής Στόλου, Fresh Foods Α.Ε.' },
  'testimonials.2.text': { en: 'The after-sales service from the team at Theologis Group is outstanding. Fast response times and genuine parts keep our fleet running smoothly every day.', el: 'Η υποστήριξη μετά την πώληση από την ομάδα στο Theologis Group είναι εξαιρετική. Γρήγοροι χρόνοι ανταπόκρισης και γνήσια ανταλλακτικά κρατούν τον στόλο μας σε άριστη λειτουργία.' },
  'testimonials.2.name': { en: 'Maria P.', el: 'Μαρία Π.' },
  'testimonials.2.role': { en: 'Operations Director, MedPharma Logistics', el: 'Διευθύντρια Λειτουργιών, MedPharma Logistics' },

  // Contact
  'contact.title': { en: 'Contact Us', el: 'Επικοινωνήστε Μαζί μας' },
  'contact.subtitle': { en: 'Get in touch for quotes, inquiries, or to schedule a visit', el: 'Επικοινωνήστε για προσφορές, ερωτήσεις ή για να προγραμματίσετε μια επίσκεψη' },
  'contact.form.name': { en: 'Full Name', el: 'Ονοματεπώνυμο' },
  'contact.form.email': { en: 'Email Address', el: 'Διεύθυνση Email' },
  'contact.form.phone': { en: 'Phone Number', el: 'Τηλέφωνο' },
  'contact.form.subject': { en: 'Subject', el: 'Θέμα' },
  'contact.form.subject.select': { en: 'Select a subject...', el: 'Επιλέξτε θέμα...' },
  'contact.form.subject.sales': { en: 'Sales Inquiry', el: 'Ερώτηση Πωλήσεων' },
  'contact.form.subject.service': { en: 'Service & Maintenance', el: 'Σέρβις & Συντήρηση' },
  'contact.form.subject.parts': { en: 'Spare Parts', el: 'Ανταλλακτικά' },
  'contact.form.subject.general': { en: 'General Inquiry', el: 'Γενική Ερώτηση' },
  'contact.form.message': { en: 'Message', el: 'Μήνυμα' },
  'contact.form.send': { en: 'Send Message', el: 'Αποστολή Μηνύματος' },
  'contact.info.address.title': { en: 'Visit Us', el: 'Επισκεφτείτε μας' },
  'contact.info.address.text': { en: 'Theologis Group Facilities\nMandra, Attica, Greece', el: 'Εγκαταστάσεις Theologis Group\nΜάνδρα, Αττική, Ελλάδα' },
  'contact.info.phone.title': { en: 'Call Us', el: 'Καλέστε μας' },
  'contact.info.phone.text': { en: '+30 210 555 0000', el: '+30 210 555 0000' },
  'contact.info.email.title': { en: 'Email Us', el: 'Στείλτε Email' },
  'contact.info.email.text': { en: 'info@hellenictrailers.gr', el: 'info@hellenictrailers.gr' },
  'contact.info.hours.title': { en: 'Working Hours', el: 'Ώρες Λειτουργίας' },
  'contact.info.hours.text': { en: 'Monday - Friday: 08:00 - 17:00\nSaturday: 09:00 - 14:00', el: 'Δευτέρα - Παρασκευή: 08:00 - 17:00\nΣάββατο: 09:00 - 14:00' },

  // CTA
  'cta.title': { en: 'Ready to Upgrade Your Fleet?', el: 'Έτοιμοι να Αναβαθμίσετε τον Στόλο σας;' },
  'cta.text': { en: 'Contact us today for a personalized quote on the Lamberet range.', el: 'Επικοινωνήστε μαζί μας σήμερα για εξατομικευμένη προσφορά.' },
  'cta.button': { en: 'Get a Quote', el: 'Ζητήστε Προσφορά' },

  // Footer
  'footer.about': { en: 'Hellenic Trailers is the official Lamberet representative in Greece, providing sales, service, and support for the full range of refrigerated transport vehicles from our facilities in Mandra.', el: 'Η Hellenic Trailers είναι ο επίσημος αντιπρόσωπος Lamberet στην Ελλάδα, παρέχοντας πωλήσεις, σέρβις και υποστήριξη για την πλήρη γκάμα ψυκτικών οχημάτων μεταφοράς από τις εγκαταστάσεις μας στη Μάνδρα.' },
  'footer.links': { en: 'Quick Links', el: 'Γρήγοροι Σύνδεσμοι' },
  'footer.products': { en: 'Products', el: 'Προϊόντα' },
  'footer.services.title': { en: 'Services', el: 'Υπηρεσίες' },
  'footer.contact.title': { en: 'Contact Info', el: 'Στοιχεία Επικοινωνίας' },
  'footer.rights': { en: '© 2026 Hellenic Trailers. All rights reserved.', el: '© 2026 Hellenic Trailers. Με επιφύλαξη παντός δικαιώματος.' },
  'footer.lamberet': { en: 'Official Lamberet Representative in Greece', el: 'Επίσημος Αντιπρόσωπος Lamberet στην Ελλάδα' },

  // About page
  'about.banner.title': { en: 'The Company', el: 'Η Εταιρεία' },
  'about.banner.text': { en: 'Your trusted partner for Lamberet refrigerated transport in Greece', el: 'Ο έμπιστος συνεργάτης σας για ψυκτικές μεταφορές Lamberet στην Ελλάδα' },
  'about.intro.title': { en: 'Three Industry Leaders, One Vision', el: 'Τρεις Ηγέτες του Κλάδου, Ένα Όραμα' },
  'about.intro.p1': { en: 'Hellenic Trailers was founded by three leading companies in the Greek refrigerated transport industry \u2014 Stathis, Theologis Group, and Systems SA \u2014 who joined forces to become the official representative of Lamberet in Greece. By combining decades of expertise in vehicle body-building, refrigeration systems, and after-sales service, Hellenic Trailers offers an unparalleled level of quality and support to its customers.', el: '\u0397 Hellenic Trailers \u03b9\u03b4\u03c1\u03cd\u03b8\u03b7\u03ba\u03b5 \u03b1\u03c0\u03cc \u03c4\u03c1\u03b5\u03b9\u03c2 \u03ba\u03bf\u03c1\u03c5\u03c6\u03b1\u03af\u03b5\u03c2 \u03b5\u03c4\u03b1\u03b9\u03c1\u03b5\u03af\u03b5\u03c2 \u03c4\u03bf\u03c5 \u03ba\u03bb\u03ac\u03b4\u03bf\u03c5 \u03c8\u03c5\u03ba\u03c4\u03b9\u03ba\u03ce\u03bd \u03bc\u03b5\u03c4\u03b1\u03c6\u03bf\u03c1\u03ce\u03bd \u03c3\u03c4\u03b7\u03bd \u0395\u03bb\u03bb\u03ac\u03b4\u03b1 \u2014 \u03c4\u03b7 Stathis, \u03c4\u03bf Theologis Group \u03ba\u03b1\u03b9 \u03c4\u03b7 Systems SA \u2014 \u03bf\u03b9 \u03bf\u03c0\u03bf\u03af\u03b5\u03c2 \u03ad\u03bd\u03c9\u03c3\u03b1\u03bd \u03c4\u03b9\u03c2 \u03b4\u03c5\u03bd\u03ac\u03bc\u03b5\u03b9\u03c2 \u03c4\u03bf\u03c5\u03c2 \u03b3\u03b9\u03b1 \u03bd\u03b1 \u03b3\u03af\u03bd\u03bf\u03c5\u03bd \u03bf \u03b5\u03c0\u03af\u03c3\u03b7\u03bc\u03bf\u03c2 \u03b1\u03bd\u03c4\u03b9\u03c0\u03c1\u03cc\u03c3\u03c9\u03c0\u03bf\u03c2 \u03c4\u03b7\u03c2 Lamberet \u03c3\u03c4\u03b7\u03bd \u0395\u03bb\u03bb\u03ac\u03b4\u03b1. \u03a3\u03c5\u03bd\u03b4\u03c5\u03ac\u03b6\u03bf\u03bd\u03c4\u03b1\u03c2 \u03b4\u03b5\u03ba\u03b1\u03b5\u03c4\u03af\u03b5\u03c2 \u03c4\u03b5\u03c7\u03bd\u03bf\u03b3\u03bd\u03c9\u03c3\u03af\u03b1\u03c2 \u03c3\u03b5 \u03ba\u03b1\u03c4\u03b1\u03c3\u03ba\u03b5\u03c5\u03ad\u03c2 \u03b1\u03bc\u03b1\u03be\u03c9\u03bc\u03ac\u03c4\u03c9\u03bd, \u03c8\u03c5\u03ba\u03c4\u03b9\u03ba\u03ac \u03c3\u03c5\u03c3\u03c4\u03ae\u03bc\u03b1\u03c4\u03b1 \u03ba\u03b1\u03b9 \u03c5\u03c0\u03b7\u03c1\u03b5\u03c3\u03af\u03b5\u03c2 after-sales, \u03b7 Hellenic Trailers \u03c0\u03c1\u03bf\u03c3\u03c6\u03ad\u03c1\u03b5\u03b9 \u03b1\u03c0\u03b1\u03c1\u03ac\u03bc\u03b9\u03bb\u03bb\u03b7 \u03c0\u03bf\u03b9\u03cc\u03c4\u03b7\u03c4\u03b1 \u03ba\u03b1\u03b9 \u03c5\u03c0\u03bf\u03c3\u03c4\u03ae\u03c1\u03b9\u03be\u03b7 \u03c3\u03c4\u03bf\u03c5\u03c2 \u03c0\u03b5\u03bb\u03ac\u03c4\u03b5\u03c2 \u03c4\u03b7\u03c2.' },
  'about.intro.p2': { en: 'Based at the state-of-the-art Theologis Group facilities in Mandra, Attica \u2014 a 15,000 m\u00b2 service center \u2014 Hellenic Trailers brings together the best of each founding company to deliver complete cold chain solutions: from the sale of new Lamberet vehicles, to Carrier Transicold refrigeration units, to expert maintenance, bodywork, and genuine spare parts.', el: '\u039c\u03b5 \u03ad\u03b4\u03c1\u03b1 \u03c4\u03b9\u03c2 \u03c5\u03c0\u03b5\u03c1\u03c3\u03cd\u03b3\u03c7\u03c1\u03bf\u03bd\u03b5\u03c2 \u03b5\u03b3\u03ba\u03b1\u03c4\u03b1\u03c3\u03c4\u03ac\u03c3\u03b5\u03b9\u03c2 \u03c4\u03bf\u03c5 Theologis Group \u03c3\u03c4\u03b7 \u039c\u03ac\u03bd\u03b4\u03c1\u03b1 \u0391\u03c4\u03c4\u03b9\u03ba\u03ae\u03c2 \u2014 \u03ad\u03bd\u03b1 \u03ba\u03ad\u03bd\u03c4\u03c1\u03bf \u03c3\u03ad\u03c1\u03b2\u03b9\u03c2 15.000 \u03c4.\u03bc. \u2014 \u03b7 Hellenic Trailers \u03c3\u03c5\u03b3\u03ba\u03b5\u03bd\u03c4\u03c1\u03ce\u03bd\u03b5\u03b9 \u03c4\u03bf \u03ba\u03b1\u03bb\u03cd\u03c4\u03b5\u03c1\u03bf \u03ba\u03ac\u03b8\u03b5 \u03b9\u03b4\u03c1\u03c5\u03c4\u03b9\u03ba\u03ae\u03c2 \u03b5\u03c4\u03b1\u03b9\u03c1\u03b5\u03af\u03b1\u03c2 \u03b3\u03b9\u03b1 \u03bd\u03b1 \u03c0\u03c1\u03bf\u03c3\u03c6\u03ad\u03c1\u03b5\u03b9 \u03bf\u03bb\u03bf\u03ba\u03bb\u03b7\u03c1\u03c9\u03bc\u03ad\u03bd\u03b5\u03c2 \u03bb\u03cd\u03c3\u03b5\u03b9\u03c2 \u03c8\u03c5\u03ba\u03c4\u03b9\u03ba\u03ae\u03c2 \u03b1\u03bb\u03c5\u03c3\u03af\u03b4\u03b1\u03c2: \u03b1\u03c0\u03cc \u03c4\u03b7\u03bd \u03c0\u03ce\u03bb\u03b7\u03c3\u03b7 \u03bd\u03ad\u03c9\u03bd \u03bf\u03c7\u03b7\u03bc\u03ac\u03c4\u03c9\u03bd Lamberet, \u03c8\u03c5\u03ba\u03c4\u03b9\u03ba\u03ad\u03c2 \u03bc\u03bf\u03bd\u03ac\u03b4\u03b5\u03c2 Carrier Transicold, \u03bc\u03ad\u03c7\u03c1\u03b9 \u03b5\u03be\u03b5\u03b9\u03b4\u03b9\u03ba\u03b5\u03c5\u03bc\u03ad\u03bd\u03b7 \u03c3\u03c5\u03bd\u03c4\u03ae\u03c1\u03b7\u03c3\u03b7, \u03c6\u03b1\u03bd\u03bf\u03c0\u03bf\u03b9\u03b5\u03af\u03bf \u03ba\u03b1\u03b9 \u03b3\u03bd\u03ae\u03c3\u03b9\u03b1 \u03b1\u03bd\u03c4\u03b1\u03bb\u03bb\u03b1\u03ba\u03c4\u03b9\u03ba\u03ac.' },
  'about.intro.p3': { en: 'This unique partnership means that Greek businesses now have access to Europe\'s leading refrigerated vehicle manufacturer backed by a team with over 100 combined years of industry experience.', el: '\u0391\u03c5\u03c4\u03ae \u03b7 \u03bc\u03bf\u03bd\u03b1\u03b4\u03b9\u03ba\u03ae \u03c3\u03c5\u03bd\u03b5\u03c1\u03b3\u03b1\u03c3\u03af\u03b1 \u03c3\u03b7\u03bc\u03b1\u03af\u03bd\u03b5\u03b9 \u03cc\u03c4\u03b9 \u03bf\u03b9 \u03b5\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ad\u03c2 \u03b5\u03c0\u03b9\u03c7\u03b5\u03b9\u03c1\u03ae\u03c3\u03b5\u03b9\u03c2 \u03ad\u03c7\u03bf\u03c5\u03bd \u03c0\u03bb\u03ad\u03bf\u03bd \u03c0\u03c1\u03cc\u03c3\u03b2\u03b1\u03c3\u03b7 \u03c3\u03c4\u03bf\u03bd \u03ba\u03bf\u03c1\u03c5\u03c6\u03b1\u03af\u03bf \u0395\u03c5\u03c1\u03c9\u03c0\u03b1\u03af\u03bf \u03ba\u03b1\u03c4\u03b1\u03c3\u03ba\u03b5\u03c5\u03b1\u03c3\u03c4\u03ae \u03c8\u03c5\u03ba\u03c4\u03b9\u03ba\u03ce\u03bd \u03bf\u03c7\u03b7\u03bc\u03ac\u03c4\u03c9\u03bd, \u03c5\u03c0\u03bf\u03c3\u03c4\u03b7\u03c1\u03b9\u03b6\u03cc\u03bc\u03b5\u03bd\u03bf \u03b1\u03c0\u03cc \u03bc\u03b9\u03b1 \u03bf\u03bc\u03ac\u03b4\u03b1 \u03bc\u03b5 \u03c0\u03ac\u03bd\u03c9 \u03b1\u03c0\u03cc 100 \u03c3\u03c5\u03bd\u03bf\u03bb\u03b9\u03ba\u03ac \u03c7\u03c1\u03cc\u03bd\u03b9\u03b1 \u03b5\u03bc\u03c0\u03b5\u03b9\u03c1\u03af\u03b1\u03c2 \u03c3\u03c4\u03bf\u03bd \u03ba\u03bb\u03ac\u03b4\u03bf.' },

  // About - Founding Companies
  'about.founders.title': { en: 'Our Founding Companies', el: '\u039f\u03b9 \u0399\u03b4\u03c1\u03c5\u03c4\u03b9\u03ba\u03ad\u03c2 \u0395\u03c4\u03b1\u03b9\u03c1\u03b5\u03af\u03b5\u03c2' },
  'about.founders.subtitle': { en: 'Three pillars of excellence in refrigerated transport', el: '\u03a4\u03c1\u03b5\u03b9\u03c2 \u03c0\u03c5\u03bb\u03ce\u03bd\u03b5\u03c2 \u03b1\u03c1\u03b9\u03c3\u03c4\u03b5\u03af\u03b1\u03c2 \u03c3\u03c4\u03b9\u03c2 \u03c8\u03c5\u03ba\u03c4\u03b9\u03ba\u03ad\u03c2 \u03bc\u03b5\u03c4\u03b1\u03c6\u03bf\u03c1\u03ad\u03c2' },
  'about.stathis.title': { en: 'Stathis', el: 'Stathis' },
  'about.stathis.text': { en: 'Since 1961, Stathis has been one of the leading companies in vehicle body-building and refrigerated bodies in Greece.', el: '\u0391\u03c0\u03cc \u03c4\u03bf 1961, \u03b7 Stathis \u03b5\u03af\u03bd\u03b1\u03b9 \u03bc\u03af\u03b1 \u03b1\u03c0\u03cc \u03c4\u03b9\u03c2 \u03ba\u03bf\u03c1\u03c5\u03c6\u03b1\u03af\u03b5\u03c2 \u03b5\u03c4\u03b1\u03b9\u03c1\u03b5\u03af\u03b5\u03c2 \u03c3\u03c4\u03bf\u03bd \u03c4\u03bf\u03bc\u03ad\u03b1 \u03ba\u03b1\u03c4\u03b1\u03c3\u03ba\u03b5\u03c5\u03ae\u03c2 \u03b1\u03bc\u03b1\u03be\u03c9\u03bc\u03ac\u03c4\u03c9\u03bd \u03ba\u03b1\u03b9 \u03c8\u03c5\u03ba\u03c4\u03b9\u03ba\u03ce\u03bd \u03b8\u03b1\u03bb\u03ac\u03bc\u03c9\u03bd \u03c3\u03c4\u03b7\u03bd \u0395\u03bb\u03bb\u03ac\u03b4\u03b1.' },
  'about.stathis.li1': { en: 'Vehicle body-building & refrigerated bodies since 1961', el: '\u039a\u03b1\u03c4\u03b1\u03c3\u03ba\u03b5\u03c5\u03ae \u03b1\u03bc\u03b1\u03be\u03c9\u03bc\u03ac\u03c4\u03c9\u03bd & \u03c8\u03c5\u03ba\u03c4\u03b9\u03ba\u03ce\u03bd \u03b8\u03b1\u03bb\u03ac\u03bc\u03c9\u03bd \u03b1\u03c0\u03cc \u03c4\u03bf 1961' },
  'about.stathis.li2': { en: 'Facilities in Thessaloniki & Athens', el: '\u0395\u03b3\u03ba\u03b1\u03c4\u03b1\u03c3\u03c4\u03ac\u03c3\u03b5\u03b9\u03c2 \u03c3\u03b5 \u0398\u03b5\u03c3\u03c3\u03b1\u03bb\u03bf\u03bd\u03af\u03ba\u03b7 & \u0391\u03b8\u03ae\u03bd\u03b1' },
  'about.stathis.li3': { en: 'Transport refrigeration, tail lifts & fleet management', el: '\u03a8\u03cd\u03be\u03b7 \u03bc\u03b5\u03c4\u03b1\u03c6\u03bf\u03c1\u03ac\u03c2, \u03c1\u03ac\u03bc\u03c0\u03b5\u03c2 & \u03b4\u03b9\u03b1\u03c7\u03b5\u03af\u03c1\u03b9\u03c3\u03b7 \u03c3\u03c4\u03cc\u03bb\u03bf\u03c5' },
  'about.theologis.title': { en: 'Theologis Group', el: 'Theologis Group' },
  'about.theologis.text': { en: 'Founded in 1980 by Theologos Thanasis, the Theologis Group has established itself as a reliable and innovative force in refrigerated vehicle repairs and special constructions.', el: '\u0399\u03b4\u03c1\u03cd\u03b8\u03b7\u03ba\u03b5 \u03c4\u03bf 1980 \u03b1\u03c0\u03cc \u03c4\u03bf\u03bd \u0398\u03b5\u03bf\u03bb\u03cc\u03b3\u03bf \u0398\u03b1\u03bd\u03ac\u03c3\u03b7, \u03c4\u03bf Theologis Group \u03ad\u03c7\u03b5\u03b9 \u03ba\u03b1\u03b8\u03b9\u03b5\u03c1\u03c9\u03b8\u03b5\u03af \u03c9\u03c2 \u03bc\u03b9\u03b1 \u03b1\u03be\u03b9\u03cc\u03c0\u03b9\u03c3\u03c4\u03b7 \u03ba\u03b1\u03b9 \u03ba\u03b1\u03b9\u03bd\u03bf\u03c4\u03cc\u03bc\u03b1 \u03b4\u03cd\u03bd\u03b1\u03bc\u03b7 \u03c3\u03c4\u03b9\u03c2 \u03b5\u03c0\u03b9\u03c3\u03ba\u03b5\u03c5\u03ad\u03c2 \u03c8\u03c5\u03ba\u03c4\u03b9\u03ba\u03ce\u03bd \u03bf\u03c7\u03b7\u03bc\u03ac\u03c4\u03c9\u03bd \u03ba\u03b1\u03b9 \u03c4\u03b9\u03c2 \u03b5\u03b9\u03b4\u03b9\u03ba\u03ad\u03c2 \u03ba\u03b1\u03c4\u03b1\u03c3\u03ba\u03b5\u03c5\u03ad\u03c2.' },
  'about.theologis.li1': { en: '40+ years in repairs & special constructions', el: '40+ \u03c7\u03c1\u03cc\u03bd\u03b9\u03b1 \u03c3\u03b5 \u03b5\u03c0\u03b9\u03c3\u03ba\u03b5\u03c5\u03ad\u03c2 & \u03b5\u03b9\u03b4\u03b9\u03ba\u03ad\u03c2 \u03ba\u03b1\u03c4\u03b1\u03c3\u03ba\u03b5\u03c5\u03ad\u03c2' },
  'about.theologis.li2': { en: '15,000 m\u00b2 facility in Mandra, Attica', el: '\u0395\u03b3\u03ba\u03b1\u03c4\u03b1\u03c3\u03c4\u03ac\u03c3\u03b5\u03b9\u03c2 15.000 \u03c4.\u03bc. \u03c3\u03c4\u03b7 \u039c\u03ac\u03bd\u03b4\u03c1\u03b1 \u0391\u03c4\u03c4\u03b9\u03ba\u03ae\u03c2' },
  'about.theologis.li3': { en: 'Chassis, bodywork, refrigeration & cold stores', el: '\u03a0\u03bb\u03b1\u03af\u03c3\u03b9\u03bf, \u03c6\u03b1\u03bd\u03bf\u03c0\u03bf\u03b9\u03b5\u03af\u03bf, \u03c8\u03c5\u03ba\u03c4\u03b9\u03ba\u03ac & \u03c8\u03c5\u03ba\u03c4\u03b9\u03ba\u03bf\u03af \u03b8\u03ac\u03bb\u03b1\u03bc\u03bf\u03b9' },
  'about.systems.title': { en: 'Systems SA', el: 'Systems SA' },
  'about.systems.text': { en: 'Established in 1990, Systems SA holds the exclusive distribution rights in Greece for Carrier Transicold, Dhollandia, and Webasto.', el: '\u0399\u03b4\u03c1\u03cd\u03b8\u03b7\u03ba\u03b5 \u03c4\u03bf 1990, \u03b7 Systems SA \u03ba\u03b1\u03c4\u03ad\u03c7\u03b5\u03b9 \u03c4\u03b1 \u03b1\u03c0\u03bf\u03ba\u03bb\u03b5\u03b9\u03c3\u03c4\u03b9\u03ba\u03ac \u03b4\u03b9\u03ba\u03b1\u03b9\u03ce\u03bc\u03b1\u03c4\u03b1 \u03b4\u03b9\u03b1\u03bd\u03bf\u03bc\u03ae\u03c2 \u03c3\u03c4\u03b7\u03bd \u0395\u03bb\u03bb\u03ac\u03b4\u03b1 \u03b3\u03b9\u03b1 \u03c4\u03b7\u03bd Carrier Transicold, \u03c4\u03b7 Dhollandia \u03ba\u03b1\u03b9 \u03c4\u03b7 Webasto.' },
  'about.systems.li1': { en: 'Exclusive distributor: Carrier Transicold, Dhollandia, Webasto', el: '\u0391\u03c0\u03bf\u03ba\u03bb\u03b5\u03b9\u03c3\u03c4\u03b9\u03ba\u03cc\u03c2 \u03b4\u03b9\u03b1\u03bd\u03bf\u03bc\u03ad\u03b1\u03c2: Carrier Transicold, Dhollandia, Webasto' },
  'about.systems.li2': { en: 'Nationwide service network', el: '\u03a0\u03b1\u03bd\u03b5\u03bb\u03bb\u03b1\u03b4\u03b9\u03ba\u03cc \u03b4\u03af\u03ba\u03c4\u03c5\u03bf \u03c3\u03ad\u03c1\u03b2\u03b9\u03c2' },
  'about.systems.li3': { en: 'Factory-trained engineers & technical support', el: '\u0395\u03c1\u03b3\u03bf\u03c3\u03c4\u03b1\u03c3\u03b9\u03b1\u03ba\u03ac \u03b5\u03ba\u03c0\u03b1\u03b9\u03b4\u03b5\u03c5\u03bc\u03ad\u03bd\u03bf\u03b9 \u03bc\u03b7\u03c7\u03b1\u03bd\u03b9\u03ba\u03bf\u03af & \u03c4\u03b5\u03c7\u03bd\u03b9\u03ba\u03ae \u03c5\u03c0\u03bf\u03c3\u03c4\u03ae\u03c1\u03b9\u03be\u03b7' },

  // About - Lamberet
  'about.lamberet.title': { en: 'About Lamberet', el: '\u03a3\u03c7\u03b5\u03c4\u03b9\u03ba\u03ac \u03bc\u03b5 \u03c4\u03b7 Lamberet' },
  'about.lamberet.text': { en: 'Founded in 1935 in Saint-Cyr-sur-Menthon, France, Lamberet has grown into Europe\'s specialist manufacturer of refrigerated vehicle bodywork. With decades of innovation in insulation technology, temperature management, and vehicle design, Lamberet serves markets across Europe and beyond.', el: '\u0399\u03b4\u03c1\u03cd\u03b8\u03b7\u03ba\u03b5 \u03c4\u03bf 1935 \u03c3\u03c4\u03bf Saint-Cyr-sur-Menthon \u03c4\u03b7\u03c2 \u0393\u03b1\u03bb\u03bb\u03af\u03b1\u03c2, \u03b7 Lamberet \u03b5\u03be\u03b5\u03bb\u03af\u03c7\u03b8\u03b7\u03ba\u03b5 \u03c3\u03c4\u03bf\u03bd \u03b5\u03b9\u03b4\u03b9\u03ba\u03cc \u03ba\u03b1\u03c4\u03b1\u03c3\u03ba\u03b5\u03c5\u03b1\u03c3\u03c4\u03ae \u03b1\u03bc\u03b1\u03be\u03c9\u03bc\u03ac\u03c4\u03c9\u03bd \u03c8\u03c5\u03ba\u03c4\u03b9\u03ba\u03ce\u03bd \u03bf\u03c7\u03b7\u03bc\u03ac\u03c4\u03c9\u03bd \u03c3\u03c4\u03b7\u03bd \u0395\u03c5\u03c1\u03ce\u03c0\u03b7. \u039c\u03b5 \u03b4\u03b5\u03ba\u03b1\u03b5\u03c4\u03af\u03b5\u03c2 \u03ba\u03b1\u03b9\u03bd\u03bf\u03c4\u03bf\u03bc\u03af\u03b1\u03c2 \u03c3\u03c4\u03b7\u03bd \u03c4\u03b5\u03c7\u03bd\u03bf\u03bb\u03bf\u03b3\u03af\u03b1 \u03bc\u03cc\u03bd\u03c9\u03c3\u03b7\u03c2, \u03c4\u03b7 \u03b4\u03b9\u03b1\u03c7\u03b5\u03af\u03c1\u03b9\u03c3\u03b7 \u03b8\u03b5\u03c1\u03bc\u03bf\u03ba\u03c1\u03b1\u03c3\u03af\u03b1\u03c2 \u03ba\u03b1\u03b9 \u03c4\u03bf\u03bd \u03c3\u03c7\u03b5\u03b4\u03b9\u03b1\u03c3\u03bc\u03cc \u03bf\u03c7\u03b7\u03bc\u03ac\u03c4\u03c9\u03bd, \u03b7 Lamberet \u03b5\u03be\u03c5\u03c0\u03b7\u03c1\u03b5\u03c4\u03b5\u03af \u03b1\u03b3\u03bf\u03c1\u03ad\u03c2 \u03c3\u03b5 \u03cc\u03bb\u03b7 \u03c4\u03b7\u03bd \u0395\u03c5\u03c1\u03ce\u03c0\u03b7.' },

  // Timeline
  'about.timeline.title': { en: 'Our Journey', el: '\u0397 \u03a0\u03bf\u03c1\u03b5\u03af\u03b1 \u03bc\u03b1\u03c2' },
  'about.timeline.1935.title': { en: 'Lamberet Founded', el: '\u038a\u03b4\u03c1\u03c5\u03c3\u03b7 Lamberet' },
  'about.timeline.1935.text': { en: 'Lamberet begins manufacturing refrigerated vehicle bodywork in Saint-Cyr-sur-Menthon, France.', el: '\u0397 Lamberet \u03be\u03b5\u03ba\u03b9\u03bd\u03ac \u03c4\u03b7\u03bd \u03ba\u03b1\u03c4\u03b1\u03c3\u03ba\u03b5\u03c5\u03ae \u03b1\u03bc\u03b1\u03be\u03c9\u03bc\u03ac\u03c4\u03c9\u03bd \u03c8\u03c5\u03ba\u03c4\u03b9\u03ba\u03ce\u03bd \u03bf\u03c7\u03b7\u03bc\u03ac\u03c4\u03c9\u03bd \u03c3\u03c4\u03bf Saint-Cyr-sur-Menthon, \u0393\u03b1\u03bb\u03bb\u03af\u03b1.' },
  'about.timeline.1961.title': { en: 'Stathis Established', el: '\u038a\u03b4\u03c1\u03c5\u03c3\u03b7 Stathis' },
  'about.timeline.1961.text': { en: 'Stathis is founded, becoming one of Greece\'s leading companies in vehicle body-building and refrigerated bodies.', el: '\u0399\u03b4\u03c1\u03cd\u03b5\u03c4\u03b1\u03b9 \u03b7 Stathis, \u03b3\u03b9\u03bd\u03cc\u03bc\u03b5\u03bd\u03b7 \u03bc\u03af\u03b1 \u03b1\u03c0\u03cc \u03c4\u03b9\u03c2 \u03ba\u03bf\u03c1\u03c5\u03c6\u03b1\u03af\u03b5\u03c2 \u03b5\u03c4\u03b1\u03b9\u03c1\u03b5\u03af\u03b5\u03c2 \u03c3\u03c4\u03b7\u03bd \u0395\u03bb\u03bb\u03ac\u03b4\u03b1 \u03c3\u03c4\u03b7\u03bd \u03ba\u03b1\u03c4\u03b1\u03c3\u03ba\u03b5\u03c5\u03ae \u03b1\u03bc\u03b1\u03be\u03c9\u03bc\u03ac\u03c4\u03c9\u03bd \u03ba\u03b1\u03b9 \u03c8\u03c5\u03ba\u03c4\u03b9\u03ba\u03ce\u03bd \u03b8\u03b1\u03bb\u03ac\u03bc\u03c9\u03bd.' },
  'about.timeline.1980.title': { en: 'Theologis Group Established', el: '\u038a\u03b4\u03c1\u03c5\u03c3\u03b7 Theologis Group' },
  'about.timeline.1980.text': { en: 'Theologos Thanasis founds the company in Mandra, specializing in refrigerated vehicle repairs and special constructions.', el: '\u039f \u0398\u03b5\u03bf\u03bb\u03cc\u03b3\u03bf\u03c2 \u0398\u03b1\u03bd\u03ac\u03c3\u03b7\u03c2 \u03b9\u03b4\u03c1\u03cd\u03b5\u03b9 \u03c4\u03b7\u03bd \u03b5\u03c4\u03b1\u03b9\u03c1\u03b5\u03af\u03b1 \u03c3\u03c4\u03b7 \u039c\u03ac\u03bd\u03b4\u03c1\u03b1, \u03b5\u03be\u03b5\u03b9\u03b4\u03b9\u03ba\u03b5\u03c5\u03bc\u03ad\u03bd\u03b7 \u03c3\u03b5 \u03b5\u03c0\u03b9\u03c3\u03ba\u03b5\u03c5\u03ad\u03c2 \u03c8\u03c5\u03ba\u03c4\u03b9\u03ba\u03ce\u03bd \u03bf\u03c7\u03b7\u03bc\u03ac\u03c4\u03c9\u03bd \u03ba\u03b1\u03b9 \u03b5\u03b9\u03b4\u03b9\u03ba\u03ad\u03c2 \u03ba\u03b1\u03c4\u03b1\u03c3\u03ba\u03b5\u03c5\u03ad\u03c2.' },
  'about.timeline.1990.title': { en: 'Systems SA Established', el: '\u038a\u03b4\u03c1\u03c5\u03c3\u03b7 Systems SA' },
  'about.timeline.1990.text': { en: 'Systems SA is founded, later becoming the exclusive Greek distributor of Carrier Transicold, Dhollandia, and Webasto.', el: '\u0399\u03b4\u03c1\u03cd\u03b5\u03c4\u03b1\u03b9 \u03b7 Systems SA, \u03b7 \u03bf\u03c0\u03bf\u03af\u03b1 \u03b1\u03c1\u03b3\u03cc\u03c4\u03b5\u03c1\u03b1 \u03b3\u03af\u03bd\u03b5\u03c4\u03b1\u03b9 \u03bf \u03b1\u03c0\u03bf\u03ba\u03bb\u03b5\u03b9\u03c3\u03c4\u03b9\u03ba\u03cc\u03c2 \u03b4\u03b9\u03b1\u03bd\u03bf\u03bc\u03ad\u03b1\u03c2 \u03c3\u03c4\u03b7\u03bd \u0395\u03bb\u03bb\u03ac\u03b4\u03b1 \u03c4\u03b7\u03c2 Carrier Transicold, Dhollandia \u03ba\u03b1\u03b9 Webasto.' },
  'about.timeline.2026.title': { en: 'Hellenic Trailers Launches', el: '\u039e\u03b5\u03ba\u03b9\u03bd\u03ac \u03b7 Hellenic Trailers' },
  'about.timeline.2026.text': { en: 'Stathis, Theologis Group, and Systems SA join forces to establish Hellenic Trailers as the official Lamberet representative in Greece.', el: '\u0397 Stathis, \u03c4\u03bf Theologis Group \u03ba\u03b1\u03b9 \u03b7 Systems SA \u03b5\u03bd\u03ce\u03bd\u03bf\u03c5\u03bd \u03c4\u03b9\u03c2 \u03b4\u03c5\u03bd\u03ac\u03bc\u03b5\u03b9\u03c2 \u03c4\u03bf\u03c5\u03c2 \u03b3\u03b9\u03b1 \u03bd\u03b1 \u03b9\u03b4\u03c1\u03cd\u03c3\u03bf\u03c5\u03bd \u03c4\u03b7\u03bd Hellenic Trailers \u03c9\u03c2 \u03b5\u03c0\u03af\u03c3\u03b7\u03bc\u03bf \u03b1\u03bd\u03c4\u03b9\u03c0\u03c1\u03cc\u03c3\u03c9\u03c0\u03bf Lamberet \u03c3\u03c4\u03b7\u03bd \u0395\u03bb\u03bb\u03ac\u03b4\u03b1.' },

  // Products page
  'products.banner.title': { en: 'Products', el: 'Προϊόντα' },
  'products.banner.text': { en: 'The complete Lamberet refrigerated vehicle range', el: 'Η πλήρης γκάμα ψυκτικών οχημάτων Lamberet' },

  // Services page
  'services.banner.title': { en: 'Services', el: 'Υπηρεσίες' },
  'services.banner.text': { en: 'Full lifecycle support for your refrigerated fleet', el: 'Πλήρης υποστήριξη κύκλου ζωής για τον ψυκτικό σας στόλο' },

  // Gallery page
  'gallery.banner.title': { en: 'Gallery', el: 'Συλλογή' },
  'gallery.banner.text': { en: 'Our facilities, products, and projects', el: 'Οι εγκαταστάσεις, τα προϊόντα και τα έργα μας' },

  // News page
  'news.banner.title': { en: 'News & Testimonials', el: 'Νέα & Μαρτυρίες' },
  'news.banner.text': { en: 'Latest updates and client feedback', el: 'Τελευταίες ενημερώσεις και σχόλια πελατών' },

  // Contact page
  'contact.banner.title': { en: 'Contact', el: 'Επικοινωνία' },
  'contact.banner.text': { en: 'We\'d love to hear from you', el: 'Θα χαρούμε να ακούσουμε από εσάς' },

  // Breadcrumbs
  'breadcrumb.home': { en: 'Home', el: 'Αρχική' },
};

// ============================================
// Language Management
// ============================================
let currentLang = localStorage.getItem('ht-lang') || 'el';

function t(key) {
  const entry = translations[key];
  if (!entry) return key;
  return entry[currentLang] || entry['en'] || key;
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('ht-lang', lang);
  document.documentElement.lang = lang === 'el' ? 'el' : 'en';

  // Update all translatable elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = text;
    } else if (el.tagName === 'OPTION') {
      el.textContent = text;
    } else {
      el.innerHTML = text.replace(/\n/g, '<br>');
    }
  });

  // Update active language button
  document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

// ============================================
// Mobile Navigation
// ============================================
function toggleMobileNav() {
  const nav = document.querySelector('nav ul');
  nav.classList.toggle('open');
}

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Set initial language
  setLanguage(currentLang);

  // Language switch buttons
  document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.getAttribute('data-lang'));
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileNav);
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Contact form
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const lang = currentLang;
      alert(lang === 'el'
        ? 'Ευχαριστούμε! Θα επικοινωνήσουμε σύντομα μαζί σας.'
        : 'Thank you! We will contact you shortly.');
      form.reset();
    });
  }
});
