import { DddService } from '../src/services/DddService';

describe('Ddd', () => {
  test('Index', async () => {
    const injections = {
      ddds: [
        {
          id: 5,
          start_ddd: '011',
          end_ddd: '017',
          price_per_minute: 6.0,
          created_at: '2020-07-12T00:04:40.421Z',
          updated_at: '2020-07-12T00:05:07.000Z',
        },
        {
          id: 1,
          start_ddd: '011',
          end_ddd: '016',
          price_per_minute: 12.0,
          created_at: '2020-07-11T21:51:19.749Z',
          updated_at: '2020-07-11T21:51:19.749Z',
        },
      ],
    };

    const res = await DddService.index({}, injections);
    expect(res).toBe(injections.ddds);
  });

  test('Show', async () => {
    const injections = {
      ddd: {
        id: 1,
        start_ddd: '011',
        end_ddd: '016',
        price_per_minute: '12.00',
        created_at: '2020-07-11T21:51:19.749Z',
        updated_at: '2020-07-11T21:51:19.749Z',
      },
    };

    const res = await DddService.show({ params: { id: 1 } }, injections);
    expect(res).toEqual({ ...injections.ddd });
  });

  test('Create', async () => {
    const body = {
      start_ddd: '013',
      end_ddd: '017',
      price_per_minute: 12.3,
    };

    const injections = {
      ddd: {
        start_ddd: null,
        end_ddd: null,
        price_per_minute: null,
      },
    };

    const res = await DddService.save({ params: {}, body }, injections);
    expect(res).toEqual({ ...body });

    expect(await DddService.save({ params: {}, body: {} }, injections).catch(err => err)).toEqual([
      'DDD inicial é obrigatório.',
      'DDD final é obrigatório.',
      'Preço por minuto é obrigatório.',
    ]);

    body.price_per_minute = -6.5;

    expect(await DddService.save({ params: {}, body }, injections).catch(err => err)).toEqual([
      'Preço por minuto deve conter um valor válido.',
    ]);
  });

  test('Update', async () => {
    const body: any = {
      price_per_minute: '4.99',
    };
    const injections = {
      ddd: {
        start_ddd: '011',
        end_ddd: '016',
        price_per_minute: '12.00',
      },
    };

    expect(await DddService.save({ params: { id: 1 }, body }, injections)).toEqual({
      start_ddd: '011',
      end_ddd: '016',
      price_per_minute: 4.99,
    });

    body.start_ddd = 'Foo';
    body.end_ddd = 'Bar';

    expect(await DddService.save({ params: { id: 1 }, body }, injections).catch(err => err)).toEqual([
      'DDD inicial deve conter apenas números.',
      'DDD final deve conter apenas números.',
    ]);
  });

  test('Delete', async () => {
    const injections = {
      ddd: {
        start_ddd: '011',
        end_ddd: '016',
        price_per_minute: 4.99,
      },
    };
    const res = await DddService.remove({ params: { id: 1 } }, injections);
    expect(res).toEqual(injections.ddd);
  });
});
