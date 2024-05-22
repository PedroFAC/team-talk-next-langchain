import { ChangeEventHandler } from "react";

interface PersonalitySelectorProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  personality: string;
}

const PersonalitySelector = ({
  onChange,
  personality = "pirate",
}: PersonalitySelectorProps) => {
  const personalities = [
    {
      value: "pirate",
      label: "🏴‍☠️ Pirate",
    },
    {
      value: "lawyer",
      label: "👨‍⚖️ Lawyer",
    },
    {
      value: "vampire",
      label: "🧛‍♀️ Vampire",
    },
  ];
  return (
    <div className="px-4">
      <p>Select a personality to interact with:</p>
      {personalities.map((element, index) => (
        <div key={index}>
          <label>
            <input
              type="radio"
              value={element.value}
              checked={element.value === personality}
              onChange={onChange}
            />
            <span className="ml-3">{element.label}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default PersonalitySelector;
