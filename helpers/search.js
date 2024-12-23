module.exports = (query) => {
    const objectSearch = {
        keywords: ""
    }
    if (query.keyword) {
        objectSearch.keywords = query.keyword;
        const regex = new RegExp(objectSearch.keywords, "i");//regex tìm kiếm ko phần biệt hoa thường và theo chữ cái
        objectSearch.regex = regex;
    }
    return objectSearch;
}