import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';
import { SignupDto, LoginDto, GetUserDto, UpdateUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { AZURE_STRATEGY, JWT_STRATEGY } from './constants';
import { User } from './decorators';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'User successfully logged in.',
    type: String,
  })
  async login(@Body() dto: LoginDto): Promise<string> {
    const token = await this.authService.login(dto);
    if (!token) {
      throw new UnauthorizedException();
    }
    return token;
  }

  @Post('signup')
  @ApiCreatedResponse({
    description: 'User has been successfully registered.',
    type: UserEntity,
  })
  async signup(@Body() dto: SignupDto): Promise<UserEntity> {
    try {
      return await this.authService.signup(dto, undefined);
    } catch (e) {
      throw new BadRequestException(e.detail || e.message);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard([JWT_STRATEGY, AZURE_STRATEGY]))
  @Get('users/:identity')
  @ApiOkResponse({
    type: UserEntity,
  })
  @ApiNotFoundResponse({ description: 'User is not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  async getUser(@Param() params: GetUserDto) {
    const user = await this.authService.getUser(params);
    if (!user) {
      throw new NotFoundException('User is not found');
    }
    return user;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard([JWT_STRATEGY, AZURE_STRATEGY]))
  @Post('users')
  @ApiCreatedResponse({
    description: 'User has been successfully registered.',
    type: UserEntity,
  })
  async createUser(@Body() dto: SignupDto, @User('sub') userId: string): Promise<UserEntity> {
    try {
      return await this.authService.signup(dto, userId);
    } catch (e) {
      throw new BadRequestException(e.detail || e.message);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard([JWT_STRATEGY, AZURE_STRATEGY]))
  @Patch('users/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'User has been successfully updated.',
    type: UserEntity,
  })
  async updateUser(
    @Body() dto: UpdateUserDto,
    @Param('userId', new ParseUUIDPipe({ version: '4' })) targetUserId: string,
    @User('sub') userId: string,
  ): Promise<UserEntity> {
    let updatedUser;
    try {
      updatedUser = await this.authService.updateUser(dto, targetUserId, userId);
    } catch (e) {
      throw new BadRequestException(e.detail || e.message);
    }

    if (!updatedUser) {
      throw new NotFoundException('user not found');
    }
    return updatedUser;
  }
}
