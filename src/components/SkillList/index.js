import { useEffect, useState } from "react";
import { getListTags } from "../../services/tagService";
import { Tag } from "antd";
import { Link } from "react-router-dom";

function SkillList() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const respone = await getListTags();
      setTags(respone);
    };
    fetchAPI();
  }, []);

  return (
    <>
      <div className="mb-20">
        {tags.map((item) => (
          <Link to={`/search?keyword=${item.value}`}>
            <Tag color="blue">{item.value}</Tag>
          </Link>
        ))}
      </div>
    </>
  );
}

export default SkillList;
