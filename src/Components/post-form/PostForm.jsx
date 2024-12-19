import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from '../index'
import service from '../../appwrite/config'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active',
    }
  }); //If we want to watch any field continuously then we can do it using watch,
  //  also can set Value using setValue and if we want control of the form then we will use this, this control is directly pass to RTE and 
  // at last we can also get values from the form using getValues
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.userData)  //Here I have made changes

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? service.uploadFile(data.image[0]) : null  //This will upload the file
      if (file) {
        service.deleteFile(post.FeaturedImage) //this will delete the file
      }
      const dbPost = await service.updatePost(
        post.$id, {
        ...data,
        FeaturedImage: file ? file.$id : undefined,
      }
      )
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    } else {
      const file = await service.uploadFile( //Todo, make changes as above
        data.image[0]
      );

      if (file) {
        const fileId = file.$id
        data.FeaturedImage = fileId
        const dbPost = await service.createPost({
          ...data,
          userId: userData.$id
        })
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value.trim().toLowerCase().replace(/^[a-zA-Z\d\s]+/g, '-').replace(/\s/g, '-') //These are regex and we can match any pattern to it. Here, we are doing a global match and ^ is a negate which means do not match this 
    } else {
      return ''
    }
  }, [])

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title,
          { shouldValidate: true }
        )) //This will setvalue in slug input field from slugTransform function
      }
    })

    return () => {
      subscription.unsubscribe() //It is memory management which optimizes the project
    }

  }, [watch, slugTransform, setValue]) //We will apply watch with title value in register

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.FeaturedImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  )
}