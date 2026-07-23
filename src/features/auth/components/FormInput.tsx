import {
    forwardRef,
    type ComponentProps,
} from 'react';

import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

interface FormInputProps extends ComponentProps<typeof TextInput> {
  label: string;
  error?: string;
}

export const FormInput = forwardRef<TextInput, FormInputProps>(
  function FormInput(
    {
      label,
      error,
      style,
      ...textInputProps
    },
    ref,
  ) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>

        <TextInput
          ref={ref}
          style={[
            styles.input,
            error ? styles.inputError : undefined,
            style,
          ]}
          placeholderTextColor="#94A3B8"
          {...textInputProps}
        />

        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },

  input: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#0F172A',
  },

  inputError: {
    borderColor: '#DC2626',
  },

  error: {
    fontSize: 13,
    color: '#DC2626',
  },
});