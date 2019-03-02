/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function textPrepController() {
    // Get the text
    var context = document.getElementById('myText').value;
    var contextArray = removeStopWords(context);
    var frequencyMap = getFrequency(contextArray);
    var sortedArray = sortMap(frequencyMap);
    var results = "";
    for(var i = 0; i < sortedArray.length; i++) {
        if(i == 0) {
            alert("Here too!");
        }
        results += "\n" + sortedArray[i].name + "\t" + sortedArray[i].total;
    }
    alert("Here!");
    document.getElementById('myText').value = results;

}

function removeStopWords(context) {
    // Load stop words. Source: https://www.nltk.org/nltk_data/
    var stopWords = ["a", "about", "above", "after", "again", "against", "ain", "all", "am", "an", "and", "any", "are", "aren", "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can", "couldn", "couldn't", "d", "did", "didn", "didn't", "do", "does", "doesn", "doesn't", "doing", "don", "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn", "hadn't", "has", "hasn", "hasn't", "have", "haven", "haven't", "having", "he", "her", "here", "hers", "herself", "him", "himself", "his", "how", "i", "if", "in", "into", "is", "isn", "isn't", "it", "its", "it's", "itself", "just", "ll", "m", "ma", "me", "mightn", "mightn't", "more", "most", "mustn", "mustn't", "my", "myself", "needn", "needn't", "no", "nor", "not", "now", "o", "of", "off", "on", "once", "only", "or", "other", "our", "ours", "ourselves", "out", "over", "own", "re", "s", "same", "shan", "shan't", "she", "she's", "should", "shouldn", "shouldn't", "should've", "so", "some", "such", "t", "than", "that", "that'll", "the", "their", "theirs", "them", "themselves", "then", "there", "these", "they", "this", "those", "through", "to", "too", "under", "until", "up", "ve", "very", "was", "wasn", "wasn't", "we", "were", "weren", "weren't", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "won", "won't", "wouldn", "wouldn't", "y", "you", "you'd", "you'll", "your", "you're", "yours", "yourself", "yourselves", "you've"];
    // Convert the text to lowercase and replace all special characters with spaces
    context = context.toLowerCase().replace(/[^\w\s+]/gi, ' ');
    // Loop text, replacing stopwords with spaces duting each iteration
    for (var i = 0; i < stopWords.length; i++) {
        var re = new RegExp("\\b" + stopWords[i] + "\\b", 'gi');
        context = context.replace(re, ' ');
    }
    // Remove carriage returns and spaces from text
    context = context.replace(/\s+/g, ' ').trim();
    // Split text into an array and remove any empty elements
    contextArray = context.split(' ').filter(Boolean);
    return contextArray;
}

function getFrequency(contextArray) {
    var frequencyMap = {};
    contextArray.forEach(function (key) {
        if (frequencyMap.hasOwnProperty(key)) {
            frequencyMap[key]++;
        } else {
            frequencyMap[key] = 1;
        }
    });
    return frequencyMap;
}

function sortMap(frequencyMap) {
    // sort by count in descending order
    var sortedArray = [];
    sortedArray = Object.keys(frequencyMap).map(function (key) {
        return {
            name: key,
            total: frequencyMap[key]
        };
    });
    sortedArray.sort(function (a, b) {
        return b.total - a.total;
    });
    return sortedArray;
}