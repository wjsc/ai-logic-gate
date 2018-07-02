// Returns if a pair of values are both true
const learningRate = 0.1;
const trainingSamples = 1;
const testSamples = 20;
const generateBinaryValue = () => Math.floor(Math.random() * 2);
const generateSample = () => ({ x: generateBinaryValue(),y : generateBinaryValue() });
const deterministicCalculation = ({x, y}) => x && y ? 1 : 0;

const generateSamples = num => {
  const samples = [];
  for(let i = 0; i<num; i++ ){
    samples.push(generateSample());
  }
  return samples;
}

const generateDeterministicCalculatedSamples = num => generateSamples(num).map(s => ({...s, output: deterministicCalculation(s)}));

const generateRandomWeights = () => ({wx: Math.random(), wy: Math.random() });

const networkCalculation = (inputs, weigths) => inputs.x * weigths.wx + inputs.y * weigths.wy;

const train = (trainingSet, learningRate) => 
  trainingSet.reduce( (currentWeight, sample) => {
    const trainedOutput = networkCalculation(sample, currentWeight);
    return {
      wx: currentWeight.wx + sample.x * (sample.output - trainedOutput) * learningRate,
      wy: currentWeight.wy + sample.y * (sample.output - trainedOutput) * learningRate
    }
  }, generateRandomWeights());

const outputAproximation = output => output > 0.5;
const isTestCorrect = (expected, output) => output ? !!expected : !expected ;
const logSampleResult = sample => console.log(`Inputs: ${!!sample.x} ^ ${!!sample.y} | Output: ${sample.output} | ${isTestCorrect(sample.expected, sample.output) ? 'OK' : 'ERROR'}`);

const test = (testSet, trainedWeights) => 
  testSet.map(sample => 
              ({
                ...sample, 
                expected: deterministicCalculation(sample), 
                output: outputAproximation(networkCalculation(sample, trainedWeights))
              })
          )
         .map(logSampleResult);


const trainedWeights = train(generateDeterministicCalculatedSamples(trainingSamples), learningRate);

console.log('-------------------------------------');
console.log('Learning Rate: ', learningRate);
console.log('Training Samples: ', trainingSamples);
console.log('Test Samples: ', testSamples);
console.log('-------------------------------------');
test(generateSamples(testSamples), trainedWeights);