import { toast } from 'react-toastify';

interface NotificationOptions {
  title: string;
  details?: string;
}

const toastNotification = ({ title, details }: NotificationOptions) => {
  toast(details ? `${title}\n${details}` : title);
};

export default toastNotification;
