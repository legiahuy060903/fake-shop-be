import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidationThumbnailPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (value.thumbnail) {
            value.thumbnail = value.thumbnail[0]
            return value
        }
        throw new BadRequestException("Cần ảnh chính")
    }
}