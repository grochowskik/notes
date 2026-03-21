'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Accordion,
  Button,
  Details,
  Dropdown,
  Form,
  Icon,
  Infotip,
  LanguageSwitch,
  Modal,
  RadioSelect,
  Section,
  Table,
  Tabs,
  ThemeToggle,
  Toggle,
} from '@/ui';
import { useRedirect } from '@/hooks';

const radioOptions = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

const dropdownOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

const tabItems = [
  { name: 'tab1', label: 'Tab 1' },
  { name: 'tab2', label: 'Tab 2' },
  { name: 'tab3', label: 'Tab 3' },
];

export function DashboardShowcase() {
  const [toggled, setToggled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoaderOpen, setModalLoaderOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');
  const [radioActive, setRadioActive] = useState('a');
  const [dropdownValue, setDropdownValue] = useState('');
  const { redirect } = useRedirect();

  const methods = useForm({
    defaultValues: {
      name: '',
      amount: '',
      otp: '',
      fruit: '',
      phone: '',
      dialCode: '48',
    },
  });

  const handleTableRowClick = () => {
    redirect({ url: '/tasks', params: { userEmail: 'john@example.com' } });
  };

  return (
    <div className="flex flex-col gap-4">
      <Section title="Button">
        <Button label="Primary" variant="primary" />
        <Button label="Secondary" variant="secondary" />
        <Button label="Danger" variant="danger" />
        <Button label="Loading" loading />
        <Button label="Disabled" disabled />
      </Section>

      <Section title="Icon">
        <Icon name="info" />
        <Icon name="loader" />
        <Icon name="eye" />
        <Icon name="eye-off" />
        <Icon name="filter" />
        <Icon name="expand" />
        <Icon name="cross" />
        <Icon name="globe" />
        <Icon name="more" />
        <Icon name="radioSelected" />
        <Icon name="radioUnselected" />
      </Section>

      <Section title="Toggle">
        <Toggle
          checked={toggled}
          leftLabel="Off"
          rightLabel="On"
          onChange={() => setToggled((v) => !v)}
        />
      </Section>

      <Section title="ThemeToggle">
        <ThemeToggle />
      </Section>

      <Section title="Tabs">
        <Tabs tabs={tabItems} activeTab={activeTab} onClick={setActiveTab} />
      </Section>

      <Section title="Accordion">
        <Accordion title="Click to expand">
          <p>Content inside accordion</p>
        </Accordion>
      </Section>

      <Section title="Infotip">
        <Infotip textInfo="This is a helpful tooltip message" />
      </Section>

      <Section title="RadioSelect">
        <RadioSelect
          options={radioOptions}
          active={radioActive}
          onChange={setRadioActive}
        />
      </Section>

      <Section title="Dropdown">
        <div className="w-60">
          <Dropdown
            options={dropdownOptions}
            value={dropdownValue}
            onChange={setDropdownValue}
            placeholder="Select a fruit..."
            label="Fruit"
          />
        </div>
      </Section>

      <Section title="Table">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row onClick={handleTableRowClick}>
              <Table.Cell>John Doe</Table.Cell>
              <Table.Cell>john@example.com</Table.Cell>
              <Table.Cell>Admin</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jane Smith</Table.Cell>
              <Table.Cell>jane@example.com</Table.Cell>
              <Table.Cell>Viewer</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Section>

      <Section title="Table — loading">
        <Table loading>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>John Doe</Table.Cell>
              <Table.Cell>john@example.com</Table.Cell>
              <Table.Cell>Admin</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Section>

      <Section title="Details">
        <Details title="User Info" cols={2}>
          <Details.Field label="Name" value="John Doe" />
          <Details.Field
            label="Email"
            value="john@example.com"
            onClick={(v) => alert(v)}
          />
          <Details.Field label="Phone" value={null} />
          <Details.Field label="Role" value="Admin" />
        </Details>
      </Section>

      <Section title="Details — loading">
        <Details loading title="User Info" cols={2}>
          <Details.Field label="Name" value="John Doe" />
          <Details.Field
            label="Email"
            value="john@example.com"
            onClick={(v) => alert(v)}
          />
          <Details.Field label="Phone" value={null} />
          <Details.Field label="Role" value="Admin" />
        </Details>
      </Section>

      <Section title="Form">
        <div className="w-full max-w-md">
          <Form
            methods={methods}
            onSubmit={(data) => alert(JSON.stringify(data))}
          >
            <Form.Input name="name" label="First Name" />
            <Form.AmountInput name="amount" label="Amount" />
            <Form.Dropdown
              name="fruit"
              label="Fruit"
              options={dropdownOptions}
              placeholder="Select a fruit..."
            />
            <Form.PhoneNumber
              name="phone"
              codeName="dialCode"
              label="Phone number"
            />
            <Form.OtpInput name="otp" />
            <Form.SubmitButton label="Submit" />
          </Form>
        </div>
      </Section>

      <Section title="LanguageSwitch">
        <LanguageSwitch />
      </Section>

      <Section title="Modal">
        <Button label="Open Modal" onClick={() => setModalOpen(true)} />
        <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
          <Modal.Header title="Modal Title" />
          <Modal.Body>
            <p>This is the modal content.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              label="Cancel"
              variant="secondary"
              onClick={() => setModalOpen(false)}
            />
            <Button
              label="Confirm"
              variant="primary"
              onClick={() => setModalOpen(false)}
            />
          </Modal.Footer>
        </Modal>
      </Section>

      <Section title="Modal — loading">
        <Button
          label="Open Loader Modal"
          onClick={() => setModalLoaderOpen(true)}
        />
        <Modal
          loading
          show={modalLoaderOpen}
          onClose={() => setModalLoaderOpen(false)}
        >
          <Modal.Header title="Modal Title" />
          <Modal.Body>
            <p>This is the modal content.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              label="Cancel"
              variant="secondary"
              onClick={() => setModalLoaderOpen(false)}
            />
            <Button
              label="Confirm"
              variant="primary"
              onClick={() => setModalLoaderOpen(false)}
            />
          </Modal.Footer>
        </Modal>
      </Section>
    </div>
  );
}
