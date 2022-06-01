import util from 'util';

export const transformWinstonFormat = {
  transform(info) {
    const params = info[Symbol.for('splat') as any];

    if (params) {
      info.message =
        info.message instanceof Error
          ? util.format(info.message, ...['\n', ...params])
          : util.format(info.message, ...params);
    }
    return info;
  },
};
