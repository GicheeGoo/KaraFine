import clsx from "clsx"

export type Spacing =
| 0
| 0.5
| 1
| 1.5
| 2
| 2.5
| 3
| 3.5
| 4
| 5
| 6
| 7
| 8
| 9
| 10
| 11
| 12
| 14
| 16
| 20
| 24
| 28
| 32
| 36
| 40
| 44
| 48
| 52
| 56
| 60
| 64
| 72
| 80
| 96

export type SpecificSize = 'px' | 'full' | 'min' | 'max' | 'fit'

export type Size = SpecificSize | Spacing

export type DefaultBg = 'bg' | 'fadedBg' | 'moreFadedBg' | 'fadestBg' | 'light' | 'fadedLight' | 'moreFadedLight' | 'fadestLight'

export type Variant = 'success' | 'warning' | 'danger' 

export type Sx = {
    w?: Size,
    h?: Size,
    p?: Size
    px?: Size
    py?: Size
    pt?: Size
    pb?: Size
    pl?: Size
    pr?: Size
    m?: Size
    mx?: Size
    my?: Size
    mt?: Size
    mb?: Size
    ml?: Size
    mr?: Size
    b?: Size
    bx?: Size
    by?: Size
    bt?: Size
    bb?: Size
    bl?: Size
    br?: Size
    bgColor?: DefaultBg | Variant
}

const convertToKebabCase = (camel: string) => camel.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)

export const convertSx = <E = Record<string, any>>(data: {
    sx?: Sx
    outsideClasses?: string,
    insideClasses?: string,
    extendedSx?: E
}): string =>
{
    const { sx, outsideClasses, insideClasses, extendedSx } = data;

    const mergedSx = { ...sx, ...extendedSx };

    const keys = <(keyof Sx)[]>Object.keys(mergedSx || {});

    let classes = ''

    keys.forEach(key =>
    {
        const value = mergedSx[key] as any;
        if (value === null || value === undefined || value === '')
        {
            return;
        }

        const isBg = key === 'bgColor'

        const firstPart = key === 'bgColor' ? '' : key;
        const lastPart = typeof value === 'string' ? convertToKebabCase(value.trim()) : value;

        const clssArr = [firstPart, lastPart].filter(Boolean);
        if (isBg)
        {
            clssArr.reverse();
        }

        const clss = clssArr.join('-');

        classes += (classes ? ` ${clss}` : clss)
    })

    classes = clsx(insideClasses, outsideClasses, classes);

    return classes;
}