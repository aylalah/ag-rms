import Avatar from './avatar';
import Button from './button';
import Select from './select';
import TextInput from './text-input';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clients,
  Dashboard,
  Industries,
  Methodology,
  Questionnaire,
  Ratings,
} from './icons';

const Icons = {
  ChevronLeft: (size: number) => <ChevronLeft size={size} />,
  ChevronRight: (size: number) => <ChevronRight size={size} />,
  ArrowLeft: (size: number) => <ArrowLeft size={size} />,
  Dashboard: (size: number) => <Dashboard size={size} />,
  Clients: (size: number) => <Clients size={size} />,
  Ratings: (size: number) => <Ratings size={size} />,
  Industries: (size: number) => <Industries size={size} />,
  Methodology: (size: number) => <Methodology size={size} />,
  Questionnaire: (size: number) => <Questionnaire size={size} />,
};

export { Button, Select, Icons, TextInput, Avatar };
