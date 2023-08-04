function canBeParsedToInt(str: string) {
    // Use regular expression to check if the string contains only digits
    return /^[0-9]+$/.test(str);
}

export default canBeParsedToInt