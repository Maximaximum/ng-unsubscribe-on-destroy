export function UnsubscribeOnDestroy() {
  return function (target: Record<string, unknown>, propertyKey: string | symbol) {
    const original = target.constructor.prototype.ngOnDestroy;

    target.constructor.prototype.ngOnDestroy = function () {
      const propertyValue = this[propertyKey];

      if (propertyValue) {
        if (propertyValue instanceof Array) {
          for (const element of propertyValue) {
            element.unsubscribe();
          }
        } else {
          propertyValue.unsubscribe();
        }
      }

      if (original) {
        original.call(this);
      }
    };
  } as PropertyDecorator;
}
