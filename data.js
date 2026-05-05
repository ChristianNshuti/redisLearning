export const getUsersFromDB = async() => {
    console.log(" Fetching from fake DB...");

    await new Promise((res) => setTimeout(res,2000));

    return [
        { id: 1, name:"Christian" },
        { id: 2, name:"Alice" },
        { id: 3, name:"Bob" }
    ];
};