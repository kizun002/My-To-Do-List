//merged with the app.js, this just a component that cannot be imported for some reason
import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

const TodoItem = ({ task, onDelete, onToggleComplete }) => {
  // Create a fade animation value that starts at full opacity (1)
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Apply fade animation when the task is toggled as complete/incomplete
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: task.completed ? 0.5 : 1,  // Fade to 50% opacity if completed, else full opacity
      duration: 300,                      // Animation duration in milliseconds
      useNativeDriver: true,              // Use native driver for better performance
    }).start();
  }, [task.completed]);                    // Run the effect whenever task.completed changes

  return (
    <Animated.View style={[styles.itemContainer, { opacity: fadeAnim }]}>
      <TouchableOpacity onPress={() => onToggleComplete(task.id)} style={styles.taskContainer}>
        <Text style={[styles.taskText, task.completed && styles.completed]}>
          {task.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(task.id)}>
        <Text style={styles.deleteText}>❌</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteText: {
    color: '#ff5c5c',
    fontSize: 18,
  },
});

export default TodoItem;
