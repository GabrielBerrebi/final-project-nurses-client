export function formatToPascalCase(title: string) {
    return title.split(' ')
        .map((part: string) => {
            const loweredString = part.toLocaleLowerCase();
            return loweredString.at(0)?.toLocaleUpperCase() + loweredString.slice(1);
        })
        .join(' ');
}
