import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { getPerformanceEvaluationById, updatePerformanceEvaluationById } from 'apiSdk/performance-evaluations';
import { performanceEvaluationValidationSchema } from 'validationSchema/performance-evaluations';
import { PerformanceEvaluationInterface } from 'interfaces/performance-evaluation';
import { EmployeeInterface } from 'interfaces/employee';
import { getEmployees } from 'apiSdk/employees';

function PerformanceEvaluationEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PerformanceEvaluationInterface>(
    () => (id ? `/performance-evaluations/${id}` : null),
    () => getPerformanceEvaluationById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PerformanceEvaluationInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePerformanceEvaluationById(id, values);
      mutate(updated);
      resetForm();
      router.push('/performance-evaluations');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PerformanceEvaluationInterface>({
    initialValues: data,
    validationSchema: performanceEvaluationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Performance Evaluations',
              link: '/performance-evaluations',
            },
            {
              label: 'Update Performance Evaluation',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Performance Evaluation
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Rating"
            formControlProps={{
              id: 'rating',
              isInvalid: !!formik.errors?.rating,
            }}
            name="rating"
            error={formik.errors?.rating}
            value={formik.values?.rating}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('rating', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.comments}
            label={'Comments'}
            props={{
              name: 'comments',
              placeholder: 'Comments',
              value: formik.values?.comments,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<EmployeeInterface>
            formik={formik}
            name={'employee_id'}
            label={'Select Employee'}
            placeholder={'Select Employee'}
            fetcher={getEmployees}
            labelField={'working_hours'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/performance-evaluations')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'performance_evaluation',
    operation: AccessOperationEnum.UPDATE,
  }),
)(PerformanceEvaluationEditPage);
