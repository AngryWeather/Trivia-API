const getCategories = async (req, res) => {
    const response = await fetch("https://opentdb.com/api_category.php");
    const json = await response.json();
    res.status(200).json(json);
}

const isNumOfQuestionsValid = numOfQuestions => {
    console.log(numOfQuestions);
    return (numOfQuestions > 0) && (numOfQuestions < 51);
}

const postTriviaData = (req, res, next) => {
    const {numOfQuestions} = req.body;
    
    if (!isNumOfQuestionsValid(numOfQuestions)) {
        res.status(400).json({error: "Number of questions must be between 1 and 50 (both inclusive)"});
    }

    next();
}

const generateURL = async (req) => {
    let url = `https://opentdb.com/api.php?amount=${req.body.numOfQuestions}`;

    if (req.body.category !== undefined) {
        let response = await fetch("https://opentdb.com/api_category.php");
        let categories = await response.json();
        let id = categories.trivia_categories.find(n => n.name === `${req.body.category}`).id;
        console.log(id);
        url += `&category=${id}`;        
    }
    console.log(url);
}

const generateForm = async (req, res) => {
    const {numOfQuestions, category, difficulty, type} = req.body;
    const response = await fetch(`https://opentdb.com/api.php?amount=${numOfQuestions}`); 
    const trivia = await response.json();
    console.log(generateURL(req));
    
    res.status(200).json(trivia);
}

module.exports = {
    getCategories,
    postTriviaData,
    generateForm,
};