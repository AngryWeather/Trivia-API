const getCategories = async (req, res) => {
    const response = await fetch("https://opentdb.com/api_category.php");
    const json = await response.json();
    res.status(200).json(json);
}

const isNumOfQuestionsValid = numOfQuestions => {
    console.log(numOfQuestions);
    return (numOfQuestions > 0) && (numOfQuestions < 51);
}

const postTriviaData = async (req, res) => {
    const {numOfQuestions, category, difficulty, type} = req.body;
    
    if (!isNumOfQuestionsValid(numOfQuestions)) {
        res.status(400).json({error: "Number of questions must be between 1 and 50 (both inclusive)"});
    }
}

module.exports = {
    getCategories,
    postTriviaData,
};