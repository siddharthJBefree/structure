export function Debounce(timeout: number, leading = false): MethodDecorator {
  return function (target: any, key: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const timeoutRefKey = `${key.toString()}_timeoutRef`;

    descriptor.value = function (...args: unknown[]) {
      clearTimeout(target[timeoutRefKey]);

      if (leading && !target[timeoutRefKey]) {
        originalMethod.apply(this, args);
      }

      target[timeoutRefKey] = setTimeout(() => {
        if (!leading) {
          originalMethod.apply(this, args);
        }
        target[timeoutRefKey] = undefined;
      }, timeout);
    };

    return descriptor;
  };
}
