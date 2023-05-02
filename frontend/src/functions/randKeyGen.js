const randKeyGen = (randKeys) => {
    const randKey = Math.floor(Math.random() * 999999999999999);

    if (!randKeys.includes(randKey)) return randKey;
    return randKeyGen(randKeys);
};

export default randKeyGen;