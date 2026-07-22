import MachineSelect from "./MachineSelect";

const MachineGroup = ({
  form,
  leftName,
  leftLabel,
  rightName,
  rightLabel,
  machines,
  loading,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <MachineSelect
        form={form}
        name={leftName}
        label={leftLabel}
        machines={machines}
        loading={loading}
      />

      <MachineSelect
        form={form}
        name={rightName}
        label={rightLabel}
        machines={machines}
        loading={loading}
      />
    </div>
  );
};

export default MachineGroup;
