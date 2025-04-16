import { observer } from 'mobx-react-lite';
import { DonationHistoryTableView } from '../view/DonationHistoryTableView';

export const DonationHistoryTable = observer(function DonationHistoryTable({ model }) {
  return <DonationHistoryTableView requests={model.requests.filter((element) => !element.current)} />;
});
