import { Injectable } from '@nestjs/common';
import { ObjectRepository } from '../object/object.repository';
import { CreateTaskDto } from './dto';
import { RequestService } from '../core/services';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CreateTaskResponse, FailedTaskModel, SuccessTaskModel } from '../core/models';
import { mapData } from '../core/utils';

@Injectable()
export class TasksService {
  constructor(private objectRepository: ObjectRepository, private requestService: RequestService) {}

  async creatTask(dto: CreateTaskDto): Promise<CreateTaskResponse> {
    const { objectId, parameters, serviceConfigTemplate, serviceName } = dto;
    const contentColumnName = await this.objectRepository.getContentColumnName(objectId);
    const props = await this.objectRepository.getContentProps(objectId, parameters, contentColumnName);

    const dbConfig = {
      objectId,
      serviceName,
      contentColumnName,
    };
    const promiseDataset = props.map(async (dataset) => {
      const mappedData = mapData(serviceConfigTemplate.data, dataset);
      const mappedParams = mapData(serviceConfigTemplate.params, dataset);

      const requestConfig = {
        ...serviceConfigTemplate,
        data: mappedData,
        params: mappedParams,
      };

      const updateConfig = {
        ...dbConfig,
        contentId: dataset.contentId,
      };
      try {
        return await this.executeTask(requestConfig, updateConfig);
      } catch (e) {
        return e;
      }
    });

    const responses = await Promise.all(promiseDataset);
    await this.objectRepository.expandContentSchema(serviceName, objectId);

    return this.checkFailedRequests(responses);
  }

  private async executeTask(
    requestConfig: AxiosRequestConfig,
    updateConfig,
  ): Promise<SuccessTaskModel | FailedTaskModel> {
    const { objectId, serviceName, contentId, contentColumnName } = updateConfig;
    let response: AxiosResponse;

    try {
      response = await this.requestService.executeRequest(requestConfig);
      const updatedValue = await this.objectRepository.updateFields(
        [{ key: serviceName, value: response.data }],
        objectId,
        contentId,
        contentColumnName,
      );

      return {
        externalResponse: updatedValue[0].value,
        contentId,
      };
    } catch (e) {
      await this.objectRepository.updateFields(
        [{ key: serviceName, value: null }],
        objectId,
        contentId,
        contentColumnName,
      );
      throw {
        contentId,
        message: e.message,
        isExternalServiceError: e.isAxiosError,
      };
    }
  }

  private checkFailedRequests(responses): CreateTaskResponse {
    const checkedResponses = {
      success: [],
      failed: [],
    };
    responses.forEach((res) => {
      if (res.hasOwnProperty('isExternalServiceError')) {
        checkedResponses.failed.push(res);
      } else {
        checkedResponses.success.push(res);
      }
    });

    return checkedResponses;
  }
}
