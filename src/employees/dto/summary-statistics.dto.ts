import { Department } from '../entities/department';
import { SubDepartment } from '../entities/sub-department';

export default interface SummaryStatisticsDto {
  mean: number;
  min: number;
  max: number;
}

export type SummaryStatisticsDepartmentDto = Record<
  Department,
  SummaryStatisticsDto
>;

export type SummaryStatisticsSubDepartmentDto = Record<
  Department,
  Record<SubDepartment, SummaryStatisticsDto>
>;
