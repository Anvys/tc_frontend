export type TModification = Record<string, string | boolean | undefined>

export const classNames = (mainClass: string, mod: TModification = {}, additional: (string | undefined)[] = []) => [
    mainClass,
    ...(
        Object.entries(mod)
            .filter(([, value]) => Boolean(value))
            .map(([className]) => className)
    ),
    ...(
        additional.filter(Boolean)
    ),
].join(' ');

export const cn = classNames;
