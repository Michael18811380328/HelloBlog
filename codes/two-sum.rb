# Two Sum
# Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
# You may assume that each input would have exactly one solution, and you may not use the same element twice.
# You can return the answer in any order.
#
# @param {Integer[]} nums
# @param {Integer} target
# @return {Integer[]}

# Approach: Using Hash table

# Complexity analysis

# Time complexity: O(n).
# We traverse the list containing n elements exactly twice.
# Since the hash table reduces the lookup time to O(1), the time complexity is O(n).

# Space complexity: O(n).
# The extra space required depends on the number of items stored in the hash table, which stores exactly n elements.

def two_sum(nums, target)
  hash = {}
  # create a hash table to store value and index
  nums.each_with_index do |num, i|
    hash[num] = i
  end
  # iterate over nums array to find the target (difference between sum target and num)
  nums.each_with_index do |num, i|
    current = target - num
    if hash[current] && hash[current] != i
      return [i, hash[current]]
    end
  end
end

# unit test
# nums = [2, 7, 11, 15]
# target = 9
# print(two_sum(nums, target))
# => [0,1]

# nums = [3, 2, 4]
# target = 6
# print(two_sum(nums, target))
# => [1,2]

# nums = [3, 3]
# target = 6
# print(two_sum(nums, target))
# => [0,1]