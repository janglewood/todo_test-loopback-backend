import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Users } from '../models';
import { UsersRepository } from '../repositories';

export class UserController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
  ) { }

  @post('/form', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Users) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, { exclude: ['id'] }),
        },
      },
    })
    users: Omit<Users, 'id'>,
  ): Promise<Users> {
    return this.usersRepository.create(users);
  }

  @get('/api', {
    responses: {
      '200': {
        description: 'Array of Users model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Users) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Users)) filter?: Filter<Users>,
  ): Promise<Users[]> {
    return this.usersRepository.find(filter);
  }

  @get('/user/{id}', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Users) } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Users> {
    return this.usersRepository.findById(id);
  }

  @put('/edit/user/{id}', {
    responses: {
      '204': {
        description: 'Users PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() users: Users,
  ): Promise<void> {
    await this.usersRepository.replaceById(id, users);
  }

  @del('/delete', {
    responses: {
      '204': {
        description: 'Users DELETE success',
      },
    },
  })
  async deleteById(@requestBody() id: number): Promise<void> {
    await this.usersRepository.deleteById(id);
  }
}
