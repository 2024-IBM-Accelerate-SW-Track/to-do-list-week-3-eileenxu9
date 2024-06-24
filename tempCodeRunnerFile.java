public class MaxValueFinder {
    public static int findMax(int[] numbers) {
        int max = 0;
        for (int i = 1; i < numbers.length; i++) {
            if (numbers[i] > max) {
                max = numbers[i];
            }
        }
        return max;
    }

    public static void main(String[] args) {
        int[] nums = {3, 5, 7, 2, 8};
        System.out.println("The maximum value is: " + findMax(nums));
    }
}
