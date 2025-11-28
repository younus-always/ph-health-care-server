import { prisma } from "../../utils/prisma";
import { IJwtPayload } from "../../types";

const createDoctorSchedule = async (user: IJwtPayload, payload: { scheduleIds: string[] }) => {
      const doctor = await prisma.doctor.findUniqueOrThrow({
            where: {
                  email: user.email
            }
      });

      const doctorScheduleData = payload.scheduleIds.map(scheduleId => ({
            doctorId: doctor.id,
            scheduleId
      }));

      return await prisma.doctorSchedules.createMany({
            data: doctorScheduleData
      });
};


export const DoctorScheduleService = {
      createDoctorSchedule
}