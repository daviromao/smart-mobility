import { runSendBusInformationJob } from "./bus-information";
import { runSendRoomInformationJob } from "./room-information";
import { runSendTrainInformationJob } from "./train-information";

export const runJobs = () => {
  runSendBusInformationJob();
  runSendRoomInformationJob();
  runSendTrainInformationJob();
};
